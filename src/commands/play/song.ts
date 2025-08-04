import { client, createCommandConfig } from 'robo.js'
import { ChatInputCommandInteraction } from 'discord.js'
import { Player, QueryType, QueueRepeatMode } from 'discord-player'

// Global player instance
let player: Player | null = null;

// Initialize player and extractors
async function initializePlayer() {
    if (player) return player;
    
    // Create player with better configuration for streaming
    player = new Player(client, {
        ytdlOptions: {
            quality: 'highestaudio',
            highWaterMark: 1 << 25
        }
    });
    
    // Add basic error event listener
    player.on('error', (error) => {
        console.log(`❌ Player error:`, error);
    });
    
    console.log('✅ Discord-player v6 initialized successfully');
    
    return player;
}

export const config = createCommandConfig({
    description: 'Play a song in the voice channel.',
    options: [
        {
            name: 'song',
            description: 'The song to play',
            type: 'string',
            required: true
        }
    ]
} as const)

export default async (interaction: ChatInputCommandInteraction) => {
	await interaction.deferReply({ ephemeral: false }) // Make replies public so everyone can see

    return interaction.editReply("Command currently not working. It is in development.")

    const optionSong = interaction.options.getString('song');
	const guildId = interaction.guild?.id;

    if (!optionSong) {
        return interaction.editReply({
            content: 'You must provide a song to play.'
        })
    }

	if (!guildId) {
		return interaction.editReply({
			content: 'This command can only be used in a server.'
		})
	}

	const member = client.guilds.cache.get(guildId)?.members.cache.get(interaction.user.id)

	if (!member) {
		return interaction.editReply({
			content: 'You must be a member of this server to use this command.'
		})
	}

	if (!member.voice.channel) {
		return interaction.editReply({
			content: 'You must be in a voice channel to use this command.'
		})
	}

    // Initialize player with extractors
    const player = await initializePlayer();

	const queue = player.nodes.create(interaction.guild, {
        metadata: interaction.channel
    });

    if (!queue) {
        return interaction.editReply({
            content: 'Failed to create a queue for this server.'
        })
    }

	try {
        if (!queue.connection) {
            await queue.connect(member.voice.channel);
        }
    } catch (error) {
        return interaction.editReply({
            content: 'Could not join the voice channel!'
        })
    }

    await interaction.editReply({
        content: `🔍 Searching for: **${optionSong}**...`
    });

    console.log(`🔍 Searching for: "${optionSong}" using AUTO search first`);

    // Try AUTO search first (more reliable than YouTube-only)
    let results = await player.search(optionSong, {
        requestedBy: member.user
    })

    console.log(`📊 Search results:`, {
        found: results?.tracks?.length || 0,
        hasResults: !!results,
        hasTracks: !!results?.tracks
    });

    if (!results || !results.tracks.length) {
        return interaction.editReply({
            content: `❌ No results found for: **${optionSong}**\n\n**Try:**\n• A different song name\n• Adding artist name\n• Using a direct SoundCloud or YouTube URL\n• Checking spelling`
        })
    }

    const song = results.tracks[0];
    console.log(`🎵 Selected track: ${song.title} by ${song.author} (${song.url})`);

    await interaction.editReply({
        content: `📝 Adding **${song.title}** by **${song.author}** to queue...`
    });

    queue.addTrack(song);
    console.log(`📝 Track added to queue. Queue size: ${queue.tracks.size}`);

    try {
        if (!queue.isPlaying()) {
            console.log(`🎮 Starting playback...`);
            await interaction.editReply({
                content: `🎮 Starting playback of **${song.title}**...\n\n*This may take a moment*`
            });
            
            await queue.play(song);
            
        } else {
            console.log(`🎶 Added to existing queue`);
            await interaction.editReply({
                content: `➕ **${song.title}** added to queue! Position: ${queue.tracks.size}`
            });
            return; // Exit early for queued songs
        }
        
        // Wait a moment for playback to start
        setTimeout(async () => {
            try {
                const channelName = member.voice.channel?.name || 'Unknown Channel';
                await interaction.editReply({
                    content: `🎵 Now playing **${song.title}** by **${song.author}** in **${channelName}**`
                });
            } catch (editError) {
                console.log('Could not update final message:', editError);
            }
        }, 2000);
        
    } catch (error) {
        console.error('❌ Failed to play track:', error);
        const errorMessage = error instanceof Error ? error.message : String(error);
        
        // Provide more specific error messages
        let userMessage = `❌ Failed to play **${song.title}**.`;
        
        if (errorMessage.includes('No valid stream') || errorMessage.includes('Could not extract')) {
            userMessage += ` The source appears to be unavailable or region-locked.`;
        } else if (errorMessage.includes('timeout')) {
            userMessage += ` The request timed out.`;
        } else {
            userMessage += ` An unexpected error occurred.`;
        }
        
        userMessage += `\n\n**Suggestions:**\n• Try a different song or search term\n• Use a direct URL from YouTube\n• The source might be region-restricted`;
        
        return interaction.editReply({
            content: userMessage
        })
    }
}
