import { client, createCommandConfig } from "robo.js";
import { Player } from "discord-player";
export const config = createCommandConfig({
    description: 'Skip the current song.'
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
        });
    }
    if (!queue.currentTrack) {
        return interaction.editReply({
            content: '❌ No song is currently playing.'
        });
    }
    const currentTrack = queue.currentTrack;
    try {
        const skipped = queue.node.skip();
        if (skipped) {
            return interaction.editReply({
                content: `⏭️ Skipped **${currentTrack.title}** by **${currentTrack.author}**`
            });
        } else {
            return interaction.editReply({
                content: '❌ Could not skip the current track.'
            });
        }
    } catch (error) {
        console.error('❌ Failed to skip track:', error);
        return interaction.editReply({
            content: '❌ Failed to skip the current track. There might be no next song in queue.'
        });
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6XFxEZXZlbG9wZW1lbnRcXERpc2NvcmQgQm90c1xcSmF2YVNjcmlwdFxcQm9iXFxzcmNcXGNvbW1hbmRzXFxwbGF5XFxza2lwLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNsaWVudCwgY3JlYXRlQ29tbWFuZENvbmZpZyB9IGZyb20gJ3JvYm8uanMnXHJcbmltcG9ydCB7IENoYXRJbnB1dENvbW1hbmRJbnRlcmFjdGlvbiB9IGZyb20gJ2Rpc2NvcmQuanMnXHJcbmltcG9ydCB7IFBsYXllciB9IGZyb20gJ2Rpc2NvcmQtcGxheWVyJ1xyXG5cclxuZXhwb3J0IGNvbnN0IGNvbmZpZyA9IGNyZWF0ZUNvbW1hbmRDb25maWcoe1xyXG4gICAgZGVzY3JpcHRpb246ICdTa2lwIHRoZSBjdXJyZW50IHNvbmcuJyxcclxufSBhcyBjb25zdClcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChpbnRlcmFjdGlvbjogQ2hhdElucHV0Q29tbWFuZEludGVyYWN0aW9uKSA9PiB7XHJcbiAgICBhd2FpdCBpbnRlcmFjdGlvbi5kZWZlclJlcGx5KHsgZXBoZW1lcmFsOiBmYWxzZSB9KVxyXG5cclxuICAgIHJldHVybiBpbnRlcmFjdGlvbi5lZGl0UmVwbHkoXCJDb21tYW5kIGN1cnJlbnRseSBub3Qgd29ya2luZy4gSXQgaXMgaW4gZGV2ZWxvcG1lbnQuXCIpO1xyXG5cclxuICAgIGNvbnN0IGd1aWxkSWQgPSBpbnRlcmFjdGlvbi5ndWlsZD8uaWQ7XHJcblxyXG4gICAgaWYgKCFndWlsZElkKSB7XHJcbiAgICAgICAgcmV0dXJuIGludGVyYWN0aW9uLmVkaXRSZXBseSh7XHJcbiAgICAgICAgICAgIGNvbnRlbnQ6ICdUaGlzIGNvbW1hbmQgY2FuIG9ubHkgYmUgdXNlZCBpbiBhIHNlcnZlci4nXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBtZW1iZXIgPSBjbGllbnQuZ3VpbGRzLmNhY2hlLmdldChndWlsZElkKT8ubWVtYmVycy5jYWNoZS5nZXQoaW50ZXJhY3Rpb24udXNlci5pZClcclxuXHJcbiAgICBpZiAoIW1lbWJlcikge1xyXG4gICAgICAgIHJldHVybiBpbnRlcmFjdGlvbi5lZGl0UmVwbHkoe1xyXG4gICAgICAgICAgICBjb250ZW50OiAnWW91IG11c3QgYmUgYSBtZW1iZXIgb2YgdGhpcyBzZXJ2ZXIgdG8gdXNlIHRoaXMgY29tbWFuZC4nXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIW1lbWJlci52b2ljZS5jaGFubmVsKSB7XHJcbiAgICAgICAgcmV0dXJuIGludGVyYWN0aW9uLmVkaXRSZXBseSh7XHJcbiAgICAgICAgICAgIGNvbnRlbnQ6ICdZb3UgbXVzdCBiZSBpbiBhIHZvaWNlIGNoYW5uZWwgdG8gdXNlIHRoaXMgY29tbWFuZC4nXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvLyBUcnkgdG8gZmluZCBhbiBleGlzdGluZyBxdWV1ZVxyXG4gICAgbGV0IHF1ZXVlID0gbnVsbDtcclxuICAgIFxyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCB0ZW1wUGxheWVyID0gbmV3IFBsYXllcihjbGllbnQpO1xyXG4gICAgICAgIHF1ZXVlID0gdGVtcFBsYXllci5xdWV1ZXMuY2FjaGUuZ2V0KGd1aWxkSWQpO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnTm8gcGxheWVyIGZvdW5kOicsIGVycm9yKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXF1ZXVlKSB7XHJcbiAgICAgICAgcmV0dXJuIGludGVyYWN0aW9uLmVkaXRSZXBseSh7XHJcbiAgICAgICAgICAgIGNvbnRlbnQ6ICfinYwgTm8gYWN0aXZlIG11c2ljIHNlc3Npb24gZm91bmQgZm9yIHRoaXMgc2VydmVyLidcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGlmICghcXVldWUuY3VycmVudFRyYWNrKSB7XHJcbiAgICAgICAgcmV0dXJuIGludGVyYWN0aW9uLmVkaXRSZXBseSh7XHJcbiAgICAgICAgICAgIGNvbnRlbnQ6ICfinYwgTm8gc29uZyBpcyBjdXJyZW50bHkgcGxheWluZy4nXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBjdXJyZW50VHJhY2sgPSBxdWV1ZS5jdXJyZW50VHJhY2s7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBza2lwcGVkID0gcXVldWUubm9kZS5za2lwKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHNraXBwZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGludGVyYWN0aW9uLmVkaXRSZXBseSh7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50OiBg4o+t77iPIFNraXBwZWQgKioke2N1cnJlbnRUcmFjay50aXRsZX0qKiBieSAqKiR7Y3VycmVudFRyYWNrLmF1dGhvcn0qKmBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gaW50ZXJhY3Rpb24uZWRpdFJlcGx5KHtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICfinYwgQ291bGQgbm90IHNraXAgdGhlIGN1cnJlbnQgdHJhY2suJ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcign4p2MIEZhaWxlZCB0byBza2lwIHRyYWNrOicsIGVycm9yKTtcclxuICAgICAgICByZXR1cm4gaW50ZXJhY3Rpb24uZWRpdFJlcGx5KHtcclxuICAgICAgICAgICAgY29udGVudDogJ+KdjCBGYWlsZWQgdG8gc2tpcCB0aGUgY3VycmVudCB0cmFjay4gVGhlcmUgbWlnaHQgYmUgbm8gbmV4dCBzb25nIGluIHF1ZXVlLidcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcbiJdLCJuYW1lcyI6WyJjbGllbnQiLCJjcmVhdGVDb21tYW5kQ29uZmlnIiwiUGxheWVyIiwiY29uZmlnIiwiZGVzY3JpcHRpb24iLCJpbnRlcmFjdGlvbiIsImRlZmVyUmVwbHkiLCJlcGhlbWVyYWwiLCJlZGl0UmVwbHkiLCJndWlsZElkIiwiZ3VpbGQiLCJpZCIsImNvbnRlbnQiLCJtZW1iZXIiLCJndWlsZHMiLCJjYWNoZSIsImdldCIsIm1lbWJlcnMiLCJ1c2VyIiwidm9pY2UiLCJjaGFubmVsIiwicXVldWUiLCJ0ZW1wUGxheWVyIiwicXVldWVzIiwiZXJyb3IiLCJjb25zb2xlIiwibG9nIiwiY3VycmVudFRyYWNrIiwic2tpcHBlZCIsIm5vZGUiLCJza2lwIiwidGl0bGUiLCJhdXRob3IiXSwibWFwcGluZ3MiOiJBQUFBLFNBQVNBLE1BQU0sRUFBRUMsbUJBQW1CLFFBQVEsVUFBUztBQUVyRCxTQUFTQyxNQUFNLFFBQVEsaUJBQWdCO0FBRXZDLE9BQU8sTUFBTUMsU0FBU0Ysb0JBQW9CO0lBQ3RDRyxhQUFhO0FBQ2pCLEdBQVc7QUFFWCxlQUFlLENBQUEsT0FBT0M7SUFDbEIsTUFBTUEsWUFBWUMsVUFBVSxDQUFDO1FBQUVDLFdBQVc7SUFBTTtJQUVoRCxPQUFPRixZQUFZRyxTQUFTLENBQUM7SUFFN0IsTUFBTUMsVUFBVUosWUFBWUssS0FBSyxFQUFFQztJQUVuQyxJQUFJLENBQUNGLFNBQVM7UUFDVixPQUFPSixZQUFZRyxTQUFTLENBQUM7WUFDekJJLFNBQVM7UUFDYjtJQUNKO0lBRUEsTUFBTUMsU0FBU2IsT0FBT2MsTUFBTSxDQUFDQyxLQUFLLENBQUNDLEdBQUcsQ0FBQ1AsVUFBVVEsUUFBUUYsTUFBTUMsSUFBSVgsWUFBWWEsSUFBSSxDQUFDUCxFQUFFO0lBRXRGLElBQUksQ0FBQ0UsUUFBUTtRQUNULE9BQU9SLFlBQVlHLFNBQVMsQ0FBQztZQUN6QkksU0FBUztRQUNiO0lBQ0o7SUFFQSxJQUFJLENBQUNDLE9BQU9NLEtBQUssQ0FBQ0MsT0FBTyxFQUFFO1FBQ3ZCLE9BQU9mLFlBQVlHLFNBQVMsQ0FBQztZQUN6QkksU0FBUztRQUNiO0lBQ0o7SUFFQSxnQ0FBZ0M7SUFDaEMsSUFBSVMsUUFBUTtJQUVaLElBQUk7UUFDQSxNQUFNQyxhQUFhLElBQUlwQixPQUFPRjtRQUM5QnFCLFFBQVFDLFdBQVdDLE1BQU0sQ0FBQ1IsS0FBSyxDQUFDQyxHQUFHLENBQUNQO0lBQ3hDLEVBQUUsT0FBT2UsT0FBTztRQUNaQyxRQUFRQyxHQUFHLENBQUMsb0JBQW9CRjtJQUNwQztJQUVBLElBQUksQ0FBQ0gsT0FBTztRQUNSLE9BQU9oQixZQUFZRyxTQUFTLENBQUM7WUFDekJJLFNBQVM7UUFDYjtJQUNKO0lBRUEsSUFBSSxDQUFDUyxNQUFNTSxZQUFZLEVBQUU7UUFDckIsT0FBT3RCLFlBQVlHLFNBQVMsQ0FBQztZQUN6QkksU0FBUztRQUNiO0lBQ0o7SUFFQSxNQUFNZSxlQUFlTixNQUFNTSxZQUFZO0lBRXZDLElBQUk7UUFDQSxNQUFNQyxVQUFVUCxNQUFNUSxJQUFJLENBQUNDLElBQUk7UUFFL0IsSUFBSUYsU0FBUztZQUNULE9BQU92QixZQUFZRyxTQUFTLENBQUM7Z0JBQ3pCSSxTQUFTLENBQUMsYUFBYSxFQUFFZSxhQUFhSSxLQUFLLENBQUMsUUFBUSxFQUFFSixhQUFhSyxNQUFNLENBQUMsRUFBRSxDQUFDO1lBQ2pGO1FBQ0osT0FBTztZQUNILE9BQU8zQixZQUFZRyxTQUFTLENBQUM7Z0JBQ3pCSSxTQUFTO1lBQ2I7UUFDSjtJQUNKLEVBQUUsT0FBT1ksT0FBTztRQUNaQyxRQUFRRCxLQUFLLENBQUMsMkJBQTJCQTtRQUN6QyxPQUFPbkIsWUFBWUcsU0FBUyxDQUFDO1lBQ3pCSSxTQUFTO1FBQ2I7SUFDSjtBQUNKLENBQUEsRUFBQyJ9