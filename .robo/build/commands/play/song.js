import { client, createCommandConfig } from "robo.js";
import { Player } from "discord-player";
// Global player instance
let player = null;
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
    player.on('error', (error)=>{
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
});
export default (async (interaction)=>{
    await interaction.deferReply({
        ephemeral: false
    }); // Make replies public so everyone can see
    return interaction.editReply("Command currently not working. It is in development.");
    const optionSong = interaction.options.getString('song');
    const guildId = interaction.guild?.id;
    if (!optionSong) {
        return interaction.editReply({
            content: 'You must provide a song to play.'
        });
    }
    if (!guildId) {
        return interaction.editReply({
            content: 'This command can only be used in a server.'
        });
    }
    const member = client.guilds.cache.get(guildId)?.members.cache.get(interaction.user.id);
    if (!member) {
        return interaction.editReply({
            content: 'You must be a member of this server to use this command.'
        });
    }
    if (!member.voice.channel) {
        return interaction.editReply({
            content: 'You must be in a voice channel to use this command.'
        });
    }
    // Initialize player with extractors
    const player = await initializePlayer();
    const queue = player.nodes.create(interaction.guild, {
        metadata: interaction.channel
    });
    if (!queue) {
        return interaction.editReply({
            content: 'Failed to create a queue for this server.'
        });
    }
    try {
        if (!queue.connection) {
            await queue.connect(member.voice.channel);
        }
    } catch (error) {
        return interaction.editReply({
            content: 'Could not join the voice channel!'
        });
    }
    await interaction.editReply({
        content: `🔍 Searching for: **${optionSong}**...`
    });
    console.log(`🔍 Searching for: "${optionSong}" using AUTO search first`);
    // Try AUTO search first (more reliable than YouTube-only)
    let results = await player.search(optionSong, {
        requestedBy: member.user
    });
    console.log(`📊 Search results:`, {
        found: results?.tracks?.length || 0,
        hasResults: !!results,
        hasTracks: !!results?.tracks
    });
    if (!results || !results.tracks.length) {
        return interaction.editReply({
            content: `❌ No results found for: **${optionSong}**\n\n**Try:**\n• A different song name\n• Adding artist name\n• Using a direct SoundCloud or YouTube URL\n• Checking spelling`
        });
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
        setTimeout(async ()=>{
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
        });
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6XFxEZXZlbG9wZW1lbnRcXERpc2NvcmQgQm90c1xcSmF2YVNjcmlwdFxcQm9iXFxzcmNcXGNvbW1hbmRzXFxwbGF5XFxzb25nLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNsaWVudCwgY3JlYXRlQ29tbWFuZENvbmZpZyB9IGZyb20gJ3JvYm8uanMnXHJcbmltcG9ydCB7IENoYXRJbnB1dENvbW1hbmRJbnRlcmFjdGlvbiB9IGZyb20gJ2Rpc2NvcmQuanMnXHJcbmltcG9ydCB7IFBsYXllciwgUXVlcnlUeXBlLCBRdWV1ZVJlcGVhdE1vZGUgfSBmcm9tICdkaXNjb3JkLXBsYXllcidcclxuXHJcbi8vIEdsb2JhbCBwbGF5ZXIgaW5zdGFuY2VcclxubGV0IHBsYXllcjogUGxheWVyIHwgbnVsbCA9IG51bGw7XHJcblxyXG4vLyBJbml0aWFsaXplIHBsYXllciBhbmQgZXh0cmFjdG9yc1xyXG5hc3luYyBmdW5jdGlvbiBpbml0aWFsaXplUGxheWVyKCkge1xyXG4gICAgaWYgKHBsYXllcikgcmV0dXJuIHBsYXllcjtcclxuICAgIFxyXG4gICAgLy8gQ3JlYXRlIHBsYXllciB3aXRoIGJldHRlciBjb25maWd1cmF0aW9uIGZvciBzdHJlYW1pbmdcclxuICAgIHBsYXllciA9IG5ldyBQbGF5ZXIoY2xpZW50LCB7XHJcbiAgICAgICAgeXRkbE9wdGlvbnM6IHtcclxuICAgICAgICAgICAgcXVhbGl0eTogJ2hpZ2hlc3RhdWRpbycsXHJcbiAgICAgICAgICAgIGhpZ2hXYXRlck1hcms6IDEgPDwgMjVcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgLy8gQWRkIGJhc2ljIGVycm9yIGV2ZW50IGxpc3RlbmVyXHJcbiAgICBwbGF5ZXIub24oJ2Vycm9yJywgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coYOKdjCBQbGF5ZXIgZXJyb3I6YCwgZXJyb3IpO1xyXG4gICAgfSk7XHJcbiAgICBcclxuICAgIGNvbnNvbGUubG9nKCfinIUgRGlzY29yZC1wbGF5ZXIgdjYgaW5pdGlhbGl6ZWQgc3VjY2Vzc2Z1bGx5Jyk7XHJcbiAgICBcclxuICAgIHJldHVybiBwbGF5ZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBjb25maWcgPSBjcmVhdGVDb21tYW5kQ29uZmlnKHtcclxuICAgIGRlc2NyaXB0aW9uOiAnUGxheSBhIHNvbmcgaW4gdGhlIHZvaWNlIGNoYW5uZWwuJyxcclxuICAgIG9wdGlvbnM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6ICdzb25nJyxcclxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdUaGUgc29uZyB0byBwbGF5JyxcclxuICAgICAgICAgICAgdHlwZTogJ3N0cmluZycsXHJcbiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgXVxyXG59IGFzIGNvbnN0KVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgKGludGVyYWN0aW9uOiBDaGF0SW5wdXRDb21tYW5kSW50ZXJhY3Rpb24pID0+IHtcclxuXHRhd2FpdCBpbnRlcmFjdGlvbi5kZWZlclJlcGx5KHsgZXBoZW1lcmFsOiBmYWxzZSB9KSAvLyBNYWtlIHJlcGxpZXMgcHVibGljIHNvIGV2ZXJ5b25lIGNhbiBzZWVcclxuXHJcbiAgICByZXR1cm4gaW50ZXJhY3Rpb24uZWRpdFJlcGx5KFwiQ29tbWFuZCBjdXJyZW50bHkgbm90IHdvcmtpbmcuIEl0IGlzIGluIGRldmVsb3BtZW50LlwiKVxyXG5cclxuICAgIGNvbnN0IG9wdGlvblNvbmcgPSBpbnRlcmFjdGlvbi5vcHRpb25zLmdldFN0cmluZygnc29uZycpO1xyXG5cdGNvbnN0IGd1aWxkSWQgPSBpbnRlcmFjdGlvbi5ndWlsZD8uaWQ7XHJcblxyXG4gICAgaWYgKCFvcHRpb25Tb25nKSB7XHJcbiAgICAgICAgcmV0dXJuIGludGVyYWN0aW9uLmVkaXRSZXBseSh7XHJcbiAgICAgICAgICAgIGNvbnRlbnQ6ICdZb3UgbXVzdCBwcm92aWRlIGEgc29uZyB0byBwbGF5LidcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuXHRpZiAoIWd1aWxkSWQpIHtcclxuXHRcdHJldHVybiBpbnRlcmFjdGlvbi5lZGl0UmVwbHkoe1xyXG5cdFx0XHRjb250ZW50OiAnVGhpcyBjb21tYW5kIGNhbiBvbmx5IGJlIHVzZWQgaW4gYSBzZXJ2ZXIuJ1xyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdGNvbnN0IG1lbWJlciA9IGNsaWVudC5ndWlsZHMuY2FjaGUuZ2V0KGd1aWxkSWQpPy5tZW1iZXJzLmNhY2hlLmdldChpbnRlcmFjdGlvbi51c2VyLmlkKVxyXG5cclxuXHRpZiAoIW1lbWJlcikge1xyXG5cdFx0cmV0dXJuIGludGVyYWN0aW9uLmVkaXRSZXBseSh7XHJcblx0XHRcdGNvbnRlbnQ6ICdZb3UgbXVzdCBiZSBhIG1lbWJlciBvZiB0aGlzIHNlcnZlciB0byB1c2UgdGhpcyBjb21tYW5kLidcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHRpZiAoIW1lbWJlci52b2ljZS5jaGFubmVsKSB7XHJcblx0XHRyZXR1cm4gaW50ZXJhY3Rpb24uZWRpdFJlcGx5KHtcclxuXHRcdFx0Y29udGVudDogJ1lvdSBtdXN0IGJlIGluIGEgdm9pY2UgY2hhbm5lbCB0byB1c2UgdGhpcyBjb21tYW5kLidcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuICAgIC8vIEluaXRpYWxpemUgcGxheWVyIHdpdGggZXh0cmFjdG9yc1xyXG4gICAgY29uc3QgcGxheWVyID0gYXdhaXQgaW5pdGlhbGl6ZVBsYXllcigpO1xyXG5cclxuXHRjb25zdCBxdWV1ZSA9IHBsYXllci5ub2Rlcy5jcmVhdGUoaW50ZXJhY3Rpb24uZ3VpbGQsIHtcclxuICAgICAgICBtZXRhZGF0YTogaW50ZXJhY3Rpb24uY2hhbm5lbFxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKCFxdWV1ZSkge1xyXG4gICAgICAgIHJldHVybiBpbnRlcmFjdGlvbi5lZGl0UmVwbHkoe1xyXG4gICAgICAgICAgICBjb250ZW50OiAnRmFpbGVkIHRvIGNyZWF0ZSBhIHF1ZXVlIGZvciB0aGlzIHNlcnZlci4nXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcblx0dHJ5IHtcclxuICAgICAgICBpZiAoIXF1ZXVlLmNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgYXdhaXQgcXVldWUuY29ubmVjdChtZW1iZXIudm9pY2UuY2hhbm5lbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICByZXR1cm4gaW50ZXJhY3Rpb24uZWRpdFJlcGx5KHtcclxuICAgICAgICAgICAgY29udGVudDogJ0NvdWxkIG5vdCBqb2luIHRoZSB2b2ljZSBjaGFubmVsISdcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGF3YWl0IGludGVyYWN0aW9uLmVkaXRSZXBseSh7XHJcbiAgICAgICAgY29udGVudDogYPCflI0gU2VhcmNoaW5nIGZvcjogKioke29wdGlvblNvbmd9KiouLi5gXHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhg8J+UjSBTZWFyY2hpbmcgZm9yOiBcIiR7b3B0aW9uU29uZ31cIiB1c2luZyBBVVRPIHNlYXJjaCBmaXJzdGApO1xyXG5cclxuICAgIC8vIFRyeSBBVVRPIHNlYXJjaCBmaXJzdCAobW9yZSByZWxpYWJsZSB0aGFuIFlvdVR1YmUtb25seSlcclxuICAgIGxldCByZXN1bHRzID0gYXdhaXQgcGxheWVyLnNlYXJjaChvcHRpb25Tb25nLCB7XHJcbiAgICAgICAgcmVxdWVzdGVkQnk6IG1lbWJlci51c2VyXHJcbiAgICB9KVxyXG5cclxuICAgIGNvbnNvbGUubG9nKGDwn5OKIFNlYXJjaCByZXN1bHRzOmAsIHtcclxuICAgICAgICBmb3VuZDogcmVzdWx0cz8udHJhY2tzPy5sZW5ndGggfHwgMCxcclxuICAgICAgICBoYXNSZXN1bHRzOiAhIXJlc3VsdHMsXHJcbiAgICAgICAgaGFzVHJhY2tzOiAhIXJlc3VsdHM/LnRyYWNrc1xyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKCFyZXN1bHRzIHx8ICFyZXN1bHRzLnRyYWNrcy5sZW5ndGgpIHtcclxuICAgICAgICByZXR1cm4gaW50ZXJhY3Rpb24uZWRpdFJlcGx5KHtcclxuICAgICAgICAgICAgY29udGVudDogYOKdjCBObyByZXN1bHRzIGZvdW5kIGZvcjogKioke29wdGlvblNvbmd9KipcXG5cXG4qKlRyeToqKlxcbuKAoiBBIGRpZmZlcmVudCBzb25nIG5hbWVcXG7igKIgQWRkaW5nIGFydGlzdCBuYW1lXFxu4oCiIFVzaW5nIGEgZGlyZWN0IFNvdW5kQ2xvdWQgb3IgWW91VHViZSBVUkxcXG7igKIgQ2hlY2tpbmcgc3BlbGxpbmdgXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzb25nID0gcmVzdWx0cy50cmFja3NbMF07XHJcbiAgICBjb25zb2xlLmxvZyhg8J+OtSBTZWxlY3RlZCB0cmFjazogJHtzb25nLnRpdGxlfSBieSAke3NvbmcuYXV0aG9yfSAoJHtzb25nLnVybH0pYCk7XHJcblxyXG4gICAgYXdhaXQgaW50ZXJhY3Rpb24uZWRpdFJlcGx5KHtcclxuICAgICAgICBjb250ZW50OiBg8J+TnSBBZGRpbmcgKioke3NvbmcudGl0bGV9KiogYnkgKioke3NvbmcuYXV0aG9yfSoqIHRvIHF1ZXVlLi4uYFxyXG4gICAgfSk7XHJcblxyXG4gICAgcXVldWUuYWRkVHJhY2soc29uZyk7XHJcbiAgICBjb25zb2xlLmxvZyhg8J+TnSBUcmFjayBhZGRlZCB0byBxdWV1ZS4gUXVldWUgc2l6ZTogJHtxdWV1ZS50cmFja3Muc2l6ZX1gKTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICAgIGlmICghcXVldWUuaXNQbGF5aW5nKCkpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYPCfjq4gU3RhcnRpbmcgcGxheWJhY2suLi5gKTtcclxuICAgICAgICAgICAgYXdhaXQgaW50ZXJhY3Rpb24uZWRpdFJlcGx5KHtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGDwn46uIFN0YXJ0aW5nIHBsYXliYWNrIG9mICoqJHtzb25nLnRpdGxlfSoqLi4uXFxuXFxuKlRoaXMgbWF5IHRha2UgYSBtb21lbnQqYFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGF3YWl0IHF1ZXVlLnBsYXkoc29uZyk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGDwn462IEFkZGVkIHRvIGV4aXN0aW5nIHF1ZXVlYCk7XHJcbiAgICAgICAgICAgIGF3YWl0IGludGVyYWN0aW9uLmVkaXRSZXBseSh7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50OiBg4p6VICoqJHtzb25nLnRpdGxlfSoqIGFkZGVkIHRvIHF1ZXVlISBQb3NpdGlvbjogJHtxdWV1ZS50cmFja3Muc2l6ZX1gXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm47IC8vIEV4aXQgZWFybHkgZm9yIHF1ZXVlZCBzb25nc1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvLyBXYWl0IGEgbW9tZW50IGZvciBwbGF5YmFjayB0byBzdGFydFxyXG4gICAgICAgIHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY2hhbm5lbE5hbWUgPSBtZW1iZXIudm9pY2UuY2hhbm5lbD8ubmFtZSB8fCAnVW5rbm93biBDaGFubmVsJztcclxuICAgICAgICAgICAgICAgIGF3YWl0IGludGVyYWN0aW9uLmVkaXRSZXBseSh7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogYPCfjrUgTm93IHBsYXlpbmcgKioke3NvbmcudGl0bGV9KiogYnkgKioke3NvbmcuYXV0aG9yfSoqIGluICoqJHtjaGFubmVsTmFtZX0qKmBcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlZGl0RXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdDb3VsZCBub3QgdXBkYXRlIGZpbmFsIG1lc3NhZ2U6JywgZWRpdEVycm9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIDIwMDApO1xyXG4gICAgICAgIFxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCfinYwgRmFpbGVkIHRvIHBsYXkgdHJhY2s6JywgZXJyb3IpO1xyXG4gICAgICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9IGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogU3RyaW5nKGVycm9yKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBQcm92aWRlIG1vcmUgc3BlY2lmaWMgZXJyb3IgbWVzc2FnZXNcclxuICAgICAgICBsZXQgdXNlck1lc3NhZ2UgPSBg4p2MIEZhaWxlZCB0byBwbGF5ICoqJHtzb25nLnRpdGxlfSoqLmA7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGVycm9yTWVzc2FnZS5pbmNsdWRlcygnTm8gdmFsaWQgc3RyZWFtJykgfHwgZXJyb3JNZXNzYWdlLmluY2x1ZGVzKCdDb3VsZCBub3QgZXh0cmFjdCcpKSB7XHJcbiAgICAgICAgICAgIHVzZXJNZXNzYWdlICs9IGAgVGhlIHNvdXJjZSBhcHBlYXJzIHRvIGJlIHVuYXZhaWxhYmxlIG9yIHJlZ2lvbi1sb2NrZWQuYDtcclxuICAgICAgICB9IGVsc2UgaWYgKGVycm9yTWVzc2FnZS5pbmNsdWRlcygndGltZW91dCcpKSB7XHJcbiAgICAgICAgICAgIHVzZXJNZXNzYWdlICs9IGAgVGhlIHJlcXVlc3QgdGltZWQgb3V0LmA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdXNlck1lc3NhZ2UgKz0gYCBBbiB1bmV4cGVjdGVkIGVycm9yIG9jY3VycmVkLmA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHVzZXJNZXNzYWdlICs9IGBcXG5cXG4qKlN1Z2dlc3Rpb25zOioqXFxu4oCiIFRyeSBhIGRpZmZlcmVudCBzb25nIG9yIHNlYXJjaCB0ZXJtXFxu4oCiIFVzZSBhIGRpcmVjdCBVUkwgZnJvbSBZb3VUdWJlXFxu4oCiIFRoZSBzb3VyY2UgbWlnaHQgYmUgcmVnaW9uLXJlc3RyaWN0ZWRgO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBpbnRlcmFjdGlvbi5lZGl0UmVwbHkoe1xyXG4gICAgICAgICAgICBjb250ZW50OiB1c2VyTWVzc2FnZVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbImNsaWVudCIsImNyZWF0ZUNvbW1hbmRDb25maWciLCJQbGF5ZXIiLCJwbGF5ZXIiLCJpbml0aWFsaXplUGxheWVyIiwieXRkbE9wdGlvbnMiLCJxdWFsaXR5IiwiaGlnaFdhdGVyTWFyayIsIm9uIiwiZXJyb3IiLCJjb25zb2xlIiwibG9nIiwiY29uZmlnIiwiZGVzY3JpcHRpb24iLCJvcHRpb25zIiwibmFtZSIsInR5cGUiLCJyZXF1aXJlZCIsImludGVyYWN0aW9uIiwiZGVmZXJSZXBseSIsImVwaGVtZXJhbCIsImVkaXRSZXBseSIsIm9wdGlvblNvbmciLCJnZXRTdHJpbmciLCJndWlsZElkIiwiZ3VpbGQiLCJpZCIsImNvbnRlbnQiLCJtZW1iZXIiLCJndWlsZHMiLCJjYWNoZSIsImdldCIsIm1lbWJlcnMiLCJ1c2VyIiwidm9pY2UiLCJjaGFubmVsIiwicXVldWUiLCJub2RlcyIsImNyZWF0ZSIsIm1ldGFkYXRhIiwiY29ubmVjdGlvbiIsImNvbm5lY3QiLCJyZXN1bHRzIiwic2VhcmNoIiwicmVxdWVzdGVkQnkiLCJmb3VuZCIsInRyYWNrcyIsImxlbmd0aCIsImhhc1Jlc3VsdHMiLCJoYXNUcmFja3MiLCJzb25nIiwidGl0bGUiLCJhdXRob3IiLCJ1cmwiLCJhZGRUcmFjayIsInNpemUiLCJpc1BsYXlpbmciLCJwbGF5Iiwic2V0VGltZW91dCIsImNoYW5uZWxOYW1lIiwiZWRpdEVycm9yIiwiZXJyb3JNZXNzYWdlIiwiRXJyb3IiLCJtZXNzYWdlIiwiU3RyaW5nIiwidXNlck1lc3NhZ2UiLCJpbmNsdWRlcyJdLCJtYXBwaW5ncyI6IkFBQUEsU0FBU0EsTUFBTSxFQUFFQyxtQkFBbUIsUUFBUSxVQUFTO0FBRXJELFNBQVNDLE1BQU0sUUFBb0MsaUJBQWdCO0FBRW5FLHlCQUF5QjtBQUN6QixJQUFJQyxTQUF3QjtBQUU1QixtQ0FBbUM7QUFDbkMsZUFBZUM7SUFDWCxJQUFJRCxRQUFRLE9BQU9BO0lBRW5CLHdEQUF3RDtJQUN4REEsU0FBUyxJQUFJRCxPQUFPRixRQUFRO1FBQ3hCSyxhQUFhO1lBQ1RDLFNBQVM7WUFDVEMsZUFBZSxLQUFLO1FBQ3hCO0lBQ0o7SUFFQSxpQ0FBaUM7SUFDakNKLE9BQU9LLEVBQUUsQ0FBQyxTQUFTLENBQUNDO1FBQ2hCQyxRQUFRQyxHQUFHLENBQUMsQ0FBQyxlQUFlLENBQUMsRUFBRUY7SUFDbkM7SUFFQUMsUUFBUUMsR0FBRyxDQUFDO0lBRVosT0FBT1I7QUFDWDtBQUVBLE9BQU8sTUFBTVMsU0FBU1gsb0JBQW9CO0lBQ3RDWSxhQUFhO0lBQ2JDLFNBQVM7UUFDTDtZQUNJQyxNQUFNO1lBQ05GLGFBQWE7WUFDYkcsTUFBTTtZQUNOQyxVQUFVO1FBQ2Q7S0FDSDtBQUNMLEdBQVc7QUFFWCxlQUFlLENBQUEsT0FBT0M7SUFDckIsTUFBTUEsWUFBWUMsVUFBVSxDQUFDO1FBQUVDLFdBQVc7SUFBTSxJQUFHLDBDQUEwQztJQUUxRixPQUFPRixZQUFZRyxTQUFTLENBQUM7SUFFN0IsTUFBTUMsYUFBYUosWUFBWUosT0FBTyxDQUFDUyxTQUFTLENBQUM7SUFDcEQsTUFBTUMsVUFBVU4sWUFBWU8sS0FBSyxFQUFFQztJQUVoQyxJQUFJLENBQUNKLFlBQVk7UUFDYixPQUFPSixZQUFZRyxTQUFTLENBQUM7WUFDekJNLFNBQVM7UUFDYjtJQUNKO0lBRUgsSUFBSSxDQUFDSCxTQUFTO1FBQ2IsT0FBT04sWUFBWUcsU0FBUyxDQUFDO1lBQzVCTSxTQUFTO1FB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