import { client, createCommandConfig } from 'robo.js'
import { ChatInputCommandInteraction } from 'discord.js'
import { Player } from 'discord-player'

export const config = createCommandConfig({
    description: 'Skip the current song.',
} as const)

export default async (interaction: ChatInputCommandInteraction) => {
    await interaction.deferReply({ ephemeral: false })

    return interaction.editReply("Command currently not working. It is in development.");

    const guildId = interaction.guild?.id;

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

    // Try to find an existing queue
    let queue = null;
    
    try {
        const tempPlayer = new Player(client);
        queue = tempPlayer.queues.cache.get(guildId);
    } catch (error) {
        console.log('No player found:', error);
    }

    if (!queue) {
        return interaction.editReply({
            content: '❌ No active music session found for this server.'
        })
    }

    if (!queue.currentTrack) {
        return interaction.editReply({
            content: '❌ No song is currently playing.'
        })
    }

    const currentTrack = queue.currentTrack;

    try {
        const skipped = queue.node.skip();
        
        if (skipped) {
            return interaction.editReply({
                content: `⏭️ Skipped **${currentTrack.title}** by **${currentTrack.author}**`
            })
        } else {
            return interaction.editReply({
                content: '❌ Could not skip the current track.'
            })
        }
    } catch (error) {
        console.error('❌ Failed to skip track:', error);
        return interaction.editReply({
            content: '❌ Failed to skip the current track. There might be no next song in queue.'
        })
    }
}
