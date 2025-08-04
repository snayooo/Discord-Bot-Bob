import { client, createCommandConfig } from "robo.js";
import { Player } from "discord-player";
export const config = createCommandConfig({
    description: 'Show the current music queue.'
});
export default (async (interaction)=>{
    await interaction.deferReply({
        ephemeral: false
    });
    return interaction.editReply("Command currently not working. It is in development.");
    const guildId = interaction.guild?.id;
    if (!guildId) {
        return interaction.editReply({
            content: 'This command can only be used in a server.'
        });
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
        });
    }
    if (!queue.currentTrack && queue.tracks.size === 0) {
        return interaction.editReply({
            content: '📭 The queue is empty. Use `/song` to add some music!'
        });
    }
    let queueString = '';
    // Current track
    if (queue.currentTrack) {
        queueString += `🎵 **Now Playing:**\n**${queue.currentTrack.title}** by **${queue.currentTrack.author}**\n\n`;
    }
    // Upcoming tracks
    if (queue.tracks.size > 0) {
        queueString += `📝 **Up Next:**\n`;
        const tracks = queue.tracks.data.slice(0, 10) // Show max 10 tracks
        ;
        tracks.forEach((track, index)=>{
            queueString += `${index + 1}. **${track.title}** by **${track.author}**\n`;
        });
        if (queue.tracks.size > 10) {
            queueString += `\n...and ${queue.tracks.size - 10} more tracks`;
        }
    }
    // Queue stats
    queueString += `\n📊 **Queue Info:**\n`;
    queueString += `• Total tracks: ${queue.tracks.size}\n`;
    queueString += `• Repeat mode: ${queue.repeatMode === 0 ? 'Off' : queue.repeatMode === 1 ? 'Track' : 'Queue'}\n`;
    queueString += `• Volume: ${queue.node.volume}%`;
    return interaction.editReply({
        content: queueString || '📭 The queue is empty.'
    });
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6XFxEZXZlbG9wZW1lbnRcXERpc2NvcmQgQm90c1xcSmF2YVNjcmlwdFxcQm9iXFxzcmNcXGNvbW1hbmRzXFxxdWV1ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjbGllbnQsIGNyZWF0ZUNvbW1hbmRDb25maWcgfSBmcm9tICdyb2JvLmpzJ1xyXG5pbXBvcnQgeyBDaGF0SW5wdXRDb21tYW5kSW50ZXJhY3Rpb24gfSBmcm9tICdkaXNjb3JkLmpzJ1xyXG5pbXBvcnQgeyBQbGF5ZXIsIFRyYWNrIH0gZnJvbSAnZGlzY29yZC1wbGF5ZXInXHJcblxyXG5leHBvcnQgY29uc3QgY29uZmlnID0gY3JlYXRlQ29tbWFuZENvbmZpZyh7XHJcbiAgICBkZXNjcmlwdGlvbjogJ1Nob3cgdGhlIGN1cnJlbnQgbXVzaWMgcXVldWUuJyxcclxufSBhcyBjb25zdClcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChpbnRlcmFjdGlvbjogQ2hhdElucHV0Q29tbWFuZEludGVyYWN0aW9uKSA9PiB7XHJcbiAgICBhd2FpdCBpbnRlcmFjdGlvbi5kZWZlclJlcGx5KHsgZXBoZW1lcmFsOiBmYWxzZSB9KVxyXG5cclxuICAgIHJldHVybiBpbnRlcmFjdGlvbi5lZGl0UmVwbHkoXCJDb21tYW5kIGN1cnJlbnRseSBub3Qgd29ya2luZy4gSXQgaXMgaW4gZGV2ZWxvcG1lbnQuXCIpO1xyXG5cclxuICAgIGNvbnN0IGd1aWxkSWQgPSBpbnRlcmFjdGlvbi5ndWlsZD8uaWQ7XHJcblxyXG4gICAgaWYgKCFndWlsZElkKSB7XHJcbiAgICAgICAgcmV0dXJuIGludGVyYWN0aW9uLmVkaXRSZXBseSh7XHJcbiAgICAgICAgICAgIGNvbnRlbnQ6ICdUaGlzIGNvbW1hbmQgY2FuIG9ubHkgYmUgdXNlZCBpbiBhIHNlcnZlci4nXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvLyBUcnkgdG8gZmluZCBhbiBleGlzdGluZyBxdWV1ZSBieSBjcmVhdGluZyBhIHRlbXBvcmFyeSBwbGF5ZXIgaW5zdGFuY2VcclxuICAgIGxldCBxdWV1ZSA9IG51bGw7XHJcbiAgICBcclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgdGVtcFBsYXllciA9IG5ldyBQbGF5ZXIoY2xpZW50KTtcclxuICAgICAgICBxdWV1ZSA9IHRlbXBQbGF5ZXIucXVldWVzLmNhY2hlLmdldChndWlsZElkKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgLy8gSWYgbm8gcGxheWVyIGV4aXN0cywgdGhlcmUncyBubyBxdWV1ZVxyXG4gICAgICAgIGNvbnNvbGUubG9nKCdObyBwbGF5ZXIgZm91bmQ6JywgZXJyb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghcXVldWUpIHtcclxuICAgICAgICByZXR1cm4gaW50ZXJhY3Rpb24uZWRpdFJlcGx5KHtcclxuICAgICAgICAgICAgY29udGVudDogJ+KdjCBObyBhY3RpdmUgbXVzaWMgc2Vzc2lvbiBmb3VuZCBmb3IgdGhpcyBzZXJ2ZXIuIFVzZSBgL3NvbmdgIHRvIHN0YXJ0IHBsYXlpbmcgbXVzaWMhJ1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFxdWV1ZS5jdXJyZW50VHJhY2sgJiYgcXVldWUudHJhY2tzLnNpemUgPT09IDApIHtcclxuICAgICAgICByZXR1cm4gaW50ZXJhY3Rpb24uZWRpdFJlcGx5KHtcclxuICAgICAgICAgICAgY29udGVudDogJ/Cfk60gVGhlIHF1ZXVlIGlzIGVtcHR5LiBVc2UgYC9zb25nYCB0byBhZGQgc29tZSBtdXNpYyEnXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBsZXQgcXVldWVTdHJpbmcgPSAnJ1xyXG4gICAgXHJcbiAgICAvLyBDdXJyZW50IHRyYWNrXHJcbiAgICBpZiAocXVldWUuY3VycmVudFRyYWNrKSB7XHJcbiAgICAgICAgcXVldWVTdHJpbmcgKz0gYPCfjrUgKipOb3cgUGxheWluZzoqKlxcbioqJHtxdWV1ZS5jdXJyZW50VHJhY2sudGl0bGV9KiogYnkgKioke3F1ZXVlLmN1cnJlbnRUcmFjay5hdXRob3J9KipcXG5cXG5gXHJcbiAgICB9XHJcblxyXG4gICAgLy8gVXBjb21pbmcgdHJhY2tzXHJcbiAgICBpZiAocXVldWUudHJhY2tzLnNpemUgPiAwKSB7XHJcbiAgICAgICAgcXVldWVTdHJpbmcgKz0gYPCfk50gKipVcCBOZXh0OioqXFxuYFxyXG4gICAgICAgIGNvbnN0IHRyYWNrcyA9IHF1ZXVlLnRyYWNrcy5kYXRhLnNsaWNlKDAsIDEwKSAvLyBTaG93IG1heCAxMCB0cmFja3NcclxuICAgICAgICBcclxuICAgICAgICB0cmFja3MuZm9yRWFjaCgodHJhY2s6IFRyYWNrLCBpbmRleDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgIHF1ZXVlU3RyaW5nICs9IGAke2luZGV4ICsgMX0uICoqJHt0cmFjay50aXRsZX0qKiBieSAqKiR7dHJhY2suYXV0aG9yfSoqXFxuYFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHF1ZXVlLnRyYWNrcy5zaXplID4gMTApIHtcclxuICAgICAgICAgICAgcXVldWVTdHJpbmcgKz0gYFxcbi4uLmFuZCAke3F1ZXVlLnRyYWNrcy5zaXplIC0gMTB9IG1vcmUgdHJhY2tzYFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBRdWV1ZSBzdGF0c1xyXG4gICAgcXVldWVTdHJpbmcgKz0gYFxcbvCfk4ogKipRdWV1ZSBJbmZvOioqXFxuYFxyXG4gICAgcXVldWVTdHJpbmcgKz0gYOKAoiBUb3RhbCB0cmFja3M6ICR7cXVldWUudHJhY2tzLnNpemV9XFxuYFxyXG4gICAgcXVldWVTdHJpbmcgKz0gYOKAoiBSZXBlYXQgbW9kZTogJHtxdWV1ZS5yZXBlYXRNb2RlID09PSAwID8gJ09mZicgOiBxdWV1ZS5yZXBlYXRNb2RlID09PSAxID8gJ1RyYWNrJyA6ICdRdWV1ZSd9XFxuYFxyXG4gICAgcXVldWVTdHJpbmcgKz0gYOKAoiBWb2x1bWU6ICR7cXVldWUubm9kZS52b2x1bWV9JWBcclxuXHJcbiAgICByZXR1cm4gaW50ZXJhY3Rpb24uZWRpdFJlcGx5KHtcclxuICAgICAgICBjb250ZW50OiBxdWV1ZVN0cmluZyB8fCAn8J+TrSBUaGUgcXVldWUgaXMgZW1wdHkuJ1xyXG4gICAgfSlcclxufVxyXG4iXSwibmFtZXMiOlsiY2xpZW50IiwiY3JlYXRlQ29tbWFuZENvbmZpZyIsIlBsYXllciIsImNvbmZpZyIsImRlc2NyaXB0aW9uIiwiaW50ZXJhY3Rpb24iLCJkZWZlclJlcGx5IiwiZXBoZW1lcmFsIiwiZWRpdFJlcGx5IiwiZ3VpbGRJZCIsImd1aWxkIiwiaWQiLCJjb250ZW50IiwicXVldWUiLCJ0ZW1wUGxheWVyIiwicXVldWVzIiwiY2FjaGUiLCJnZXQiLCJlcnJvciIsImNvbnNvbGUiLCJsb2ciLCJjdXJyZW50VHJhY2siLCJ0cmFja3MiLCJzaXplIiwicXVldWVTdHJpbmciLCJ0aXRsZSIsImF1dGhvciIsImRhdGEiLCJzbGljZSIsImZvckVhY2giLCJ0cmFjayIsImluZGV4IiwicmVwZWF0TW9kZSIsIm5vZGUiLCJ2b2x1bWUiXSwibWFwcGluZ3MiOiJBQUFBLFNBQVNBLE1BQU0sRUFBRUMsbUJBQW1CLFFBQVEsVUFBUztBQUVyRCxTQUFTQyxNQUFNLFFBQWUsaUJBQWdCO0FBRTlDLE9BQU8sTUFBTUMsU0FBU0Ysb0JBQW9CO0lBQ3RDRyxhQUFhO0FBQ2pCLEdBQVc7QUFFWCxlQUFlLENBQUEsT0FBT0M7SUFDbEIsTUFBTUEsWUFBWUMsVUFBVSxDQUFDO1FBQUVDLFdBQVc7SUFBTTtJQUVoRCxPQUFPRixZQUFZRyxTQUFTLENBQUM7SUFFN0IsTUFBTUMsVUFBVUosWUFBWUssS0FBSyxFQUFFQztJQUVuQyxJQUFJLENBQUNGLFNBQVM7UUFDVixPQUFPSixZQUFZRyxTQUFTLENBQUM7WUFDekJJLFNBQVM7UUFDYjtJQUNKO0lBRUEsd0VBQXdFO0lBQ3hFLElBQUlDLFFBQVE7SUFFWixJQUFJO1FBQ0EsTUFBTUMsYUFBYSxJQUFJWixPQUFPRjtRQUM5QmEsUUFBUUMsV0FBV0MsTUFBTSxDQUFDQyxLQUFLLENBQUNDLEdBQUcsQ0FBQ1I7SUFDeEMsRUFBRSxPQUFPUyxPQUFPO1FBQ1osd0NBQXdDO1FBQ3hDQyxRQUFRQyxHQUFHLENBQUMsb0JBQW9CRjtJQUNwQztJQUVBLElBQUksQ0FBQ0wsT0FBTztRQUNSLE9BQU9SLFlBQVlHLFNBQVMsQ0FBQztZQUN6QkksU0FBUztRQUNiO0lBQ0o7SUFFQSxJQUFJLENBQUNDLE1BQU1RLFlBQVksSUFBSVIsTUFBTVMsTUFBTSxDQUFDQyxJQUFJLEtBQUssR0FBRztRQUNoRCxPQUFPbEIsWUFBWUcsU0FBUyxDQUFDO1lBQ3pCSSxTQUFTO1FBQ2I7SUFDSjtJQUVBLElBQUlZLGNBQWM7SUFFbEIsZ0JBQWdCO0lBQ2hCLElBQUlYLE1BQU1RLFlBQVksRUFBRTtRQUNwQkcsZUFBZSxDQUFDLHVCQUF1QixFQUFFWCxNQUFNUSxZQUFZLENBQUNJLEtBQUssQ0FBQyxRQUFRLEVBQUVaLE1BQU1RLFlBQVksQ0FBQ0ssTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUNqSDtJQUVBLGtCQUFrQjtJQUNsQixJQUFJYixNQUFNUyxNQUFNLENBQUNDLElBQUksR0FBRyxHQUFHO1FBQ3ZCQyxlQUFlLENBQUMsaUJBQWlCLENBQUM7UUFDbEMsTUFBTUYsU0FBU1QsTUFBTVMsTUFBTSxDQUFDSyxJQUFJLENBQUNDLEtBQUssQ0FBQyxHQUFHLElBQUkscUJBQXFCOztRQUVuRU4sT0FBT08sT0FBTyxDQUFDLENBQUNDLE9BQWNDO1lBQzFCUCxlQUFlLEdBQUdPLFFBQVEsRUFBRSxJQUFJLEVBQUVELE1BQU1MLEtBQUssQ0FBQyxRQUFRLEVBQUVLLE1BQU1KLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDOUU7UUFFQSxJQUFJYixNQUFNUyxNQUFNLENBQUNDLElBQUksR0FBRyxJQUFJO1lBQ3hCQyxlQUFlLENBQUMsU0FBUyxFQUFFWCxNQUFNUyxNQUFNLENBQUNDLElBQUksR0FBRyxHQUFHLFlBQVksQ0FBQztRQUNuRTtJQUNKO0lBRUEsY0FBYztJQUNkQyxlQUFlLENBQUMsc0JBQXNCLENBQUM7SUFDdkNBLGVBQWUsQ0FBQyxnQkFBZ0IsRUFBRVgsTUFBTVMsTUFBTSxDQUFDQyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQ3ZEQyxlQUFlLENBQUMsZUFBZSxFQUFFWCxNQUFNbUIsVUFBVSxLQUFLLElBQUksUUFBUW5CLE1BQU1tQixVQUFVLEtBQUssSUFBSSxVQUFVLFFBQVEsRUFBRSxDQUFDO0lBQ2hIUixlQUFlLENBQUMsVUFBVSxFQUFFWCxNQUFNb0IsSUFBSSxDQUFDQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBRWhELE9BQU83QixZQUFZRyxTQUFTLENBQUM7UUFDekJJLFNBQVNZLGVBQWU7SUFDNUI7QUFDSixDQUFBLEVBQUMifQ==