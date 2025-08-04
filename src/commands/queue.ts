import { client, createCommandConfig } from 'robo.js'
import { ChatInputCommandInteraction } from 'discord.js'
import { Player, Track } from 'discord-player'

export const config = createCommandConfig({
    description: 'Show the current music queue.',
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

    // Try to find an existing queue by creating a temporary player instance
    let queue = null;
    
    try {
        const tempPlayer = new Player(client);
        queue = tempPlayer.queues.cache.get(guildId);
    } catch (error) {
        // If no player exists, there's no queue
        console.log('No player found:', error);
    }

    if (!queue) {
        return interaction.editReply({
            content: '❌ No active music session found for this server. Use `/song` to start playing music!'
        })
    }

    if (!queue.currentTrack && queue.tracks.size === 0) {
        return interaction.editReply({
            content: '📭 The queue is empty. Use `/song` to add some music!'
        })
    }

    let queueString = ''
    
    // Current track
    if (queue.currentTrack) {
        queueString += `🎵 **Now Playing:**\n**${queue.currentTrack.title}** by **${queue.currentTrack.author}**\n\n`
    }

    // Upcoming tracks
    if (queue.tracks.size > 0) {
        queueString += `📝 **Up Next:**\n`
        const tracks = queue.tracks.data.slice(0, 10) // Show max 10 tracks
        
        tracks.forEach((track: Track, index: number) => {
            queueString += `${index + 1}. **${track.title}** by **${track.author}**\n`
        })
        
        if (queue.tracks.size > 10) {
            queueString += `\n...and ${queue.tracks.size - 10} more tracks`
        }
    }

    // Queue stats
    queueString += `\n📊 **Queue Info:**\n`
    queueString += `• Total tracks: ${queue.tracks.size}\n`
    queueString += `• Repeat mode: ${queue.repeatMode === 0 ? 'Off' : queue.repeatMode === 1 ? 'Track' : 'Queue'}\n`
    queueString += `• Volume: ${queue.node.volume}%`

    return interaction.editReply({
        content: queueString || '📭 The queue is empty.'
    })
}
