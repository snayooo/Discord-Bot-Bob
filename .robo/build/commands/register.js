import { createCommandConfig } from "robo.js";
import db from "../utils/DBUtils.js";
export const config = createCommandConfig({
    description: 'Registers a new user in the system.'
});
export default (async (interaction)=>{
    await interaction.deferReply({
        ephemeral: true
    });
    await interaction.editReply('Registering...');
    const userId = interaction.user.id;
    const username = interaction.user.username;
    const dbUser = await db.user.findUnique({
        where: {
            discordUserId: userId
        }
    });
    if (dbUser) {
        return 'You are already registered!';
    }
    try {
        const newDBUser = await db.user.create({
            data: {
                discordUserId: userId,
                discordUsername: username,
                discordDiscriminator: interaction.user.discriminator,
                discordAvatarUrl: interaction.user.avatarURL() || ''
            }
        });
        await interaction.editReply(`You have been registered successfully!`);
    } catch (error) {
        console.error('Error creating user:', error);
        return interaction.editReply('There was an error registering you.');
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6XFxEZXZlbG9wZW1lbnRcXERpc2NvcmQgQm90c1xcSmF2YVNjcmlwdFxcQm9iXFxzcmNcXGNvbW1hbmRzXFxyZWdpc3Rlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGF0SW5wdXRDb21tYW5kSW50ZXJhY3Rpb24gfSBmcm9tIFwiZGlzY29yZC5qc1wiO1xyXG5pbXBvcnQgeyBjcmVhdGVDb21tYW5kQ29uZmlnIH0gZnJvbSBcInJvYm8uanNcIjtcclxuaW1wb3J0IGRiIGZyb20gXCIuLi91dGlscy9EQlV0aWxzXCI7XHJcblxyXG5leHBvcnQgY29uc3QgY29uZmlnID0gY3JlYXRlQ29tbWFuZENvbmZpZyh7XHJcbiAgICBkZXNjcmlwdGlvbjogJ1JlZ2lzdGVycyBhIG5ldyB1c2VyIGluIHRoZSBzeXN0ZW0uJ1xyXG59IGFzIGNvbnN0KVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgKGludGVyYWN0aW9uOiBDaGF0SW5wdXRDb21tYW5kSW50ZXJhY3Rpb24pID0+IHtcclxuXHJcbiAgICBhd2FpdCBpbnRlcmFjdGlvbi5kZWZlclJlcGx5KHsgZXBoZW1lcmFsOiB0cnVlIH0pO1xyXG4gICAgYXdhaXQgaW50ZXJhY3Rpb24uZWRpdFJlcGx5KCdSZWdpc3RlcmluZy4uLicpO1xyXG4gICAgXHJcbiAgICBjb25zdCB1c2VySWQgPSBpbnRlcmFjdGlvbi51c2VyLmlkO1xyXG4gICAgY29uc3QgdXNlcm5hbWUgPSBpbnRlcmFjdGlvbi51c2VyLnVzZXJuYW1lO1xyXG5cclxuICAgIGNvbnN0IGRiVXNlciA9IGF3YWl0IGRiLnVzZXIuZmluZFVuaXF1ZSh7XHJcbiAgICAgICAgd2hlcmU6IHtcclxuICAgICAgICAgICAgZGlzY29yZFVzZXJJZDogdXNlcklkXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuICAgIGlmKGRiVXNlcikge1xyXG4gICAgICAgIHJldHVybiAnWW91IGFyZSBhbHJlYWR5IHJlZ2lzdGVyZWQhJztcclxuICAgIH1cclxuXHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IG5ld0RCVXNlciA9IGF3YWl0IGRiLnVzZXIuY3JlYXRlKHtcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgZGlzY29yZFVzZXJJZDogdXNlcklkLFxyXG4gICAgICAgICAgICAgICAgZGlzY29yZFVzZXJuYW1lOiB1c2VybmFtZSxcclxuICAgICAgICAgICAgICAgIGRpc2NvcmREaXNjcmltaW5hdG9yOiBpbnRlcmFjdGlvbi51c2VyLmRpc2NyaW1pbmF0b3IsXHJcbiAgICAgICAgICAgICAgICBkaXNjb3JkQXZhdGFyVXJsOiBpbnRlcmFjdGlvbi51c2VyLmF2YXRhclVSTCgpIHx8ICcnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBhd2FpdCBpbnRlcmFjdGlvbi5lZGl0UmVwbHkoYFlvdSBoYXZlIGJlZW4gcmVnaXN0ZXJlZCBzdWNjZXNzZnVsbHkhYCk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGNyZWF0aW5nIHVzZXI6JywgZXJyb3IpO1xyXG4gICAgICAgIHJldHVybiBpbnRlcmFjdGlvbi5lZGl0UmVwbHkoJ1RoZXJlIHdhcyBhbiBlcnJvciByZWdpc3RlcmluZyB5b3UuJyk7XHJcbiAgICB9XHJcblxyXG59Il0sIm5hbWVzIjpbImNyZWF0ZUNvbW1hbmRDb25maWciLCJkYiIsImNvbmZpZyIsImRlc2NyaXB0aW9uIiwiaW50ZXJhY3Rpb24iLCJkZWZlclJlcGx5IiwiZXBoZW1lcmFsIiwiZWRpdFJlcGx5IiwidXNlcklkIiwidXNlciIsImlkIiwidXNlcm5hbWUiLCJkYlVzZXIiLCJmaW5kVW5pcXVlIiwid2hlcmUiLCJkaXNjb3JkVXNlcklkIiwibmV3REJVc2VyIiwiY3JlYXRlIiwiZGF0YSIsImRpc2NvcmRVc2VybmFtZSIsImRpc2NvcmREaXNjcmltaW5hdG9yIiwiZGlzY3JpbWluYXRvciIsImRpc2NvcmRBdmF0YXJVcmwiLCJhdmF0YXJVUkwiLCJlcnJvciIsImNvbnNvbGUiXSwibWFwcGluZ3MiOiJBQUNBLFNBQVNBLG1CQUFtQixRQUFRLFVBQVU7QUFDOUMsT0FBT0MsUUFBUSxzQkFBbUI7QUFFbEMsT0FBTyxNQUFNQyxTQUFTRixvQkFBb0I7SUFDdENHLGFBQWE7QUFDakIsR0FBVztBQUVYLGVBQWUsQ0FBQSxPQUFPQztJQUVsQixNQUFNQSxZQUFZQyxVQUFVLENBQUM7UUFBRUMsV0FBVztJQUFLO0lBQy9DLE1BQU1GLFlBQVlHLFNBQVMsQ0FBQztJQUU1QixNQUFNQyxTQUFTSixZQUFZSyxJQUFJLENBQUNDLEVBQUU7SUFDbEMsTUFBTUMsV0FBV1AsWUFBWUssSUFBSSxDQUFDRSxRQUFRO0lBRTFDLE1BQU1DLFNBQVMsTUFBTVgsR0FBR1EsSUFBSSxDQUFDSSxVQUFVLENBQUM7UUFDcENDLE9BQU87WUFDSEMsZUFBZVA7UUFDbkI7SUFDSjtJQUNBLElBQUdJLFFBQVE7UUFDUCxPQUFPO0lBQ1g7SUFFQSxJQUFJO1FBQ0EsTUFBTUksWUFBWSxNQUFNZixHQUFHUSxJQUFJLENBQUNRLE1BQU0sQ0FBQztZQUNuQ0MsTUFBTTtnQkFDRkgsZUFBZVA7Z0JBQ2ZXLGlCQUFpQlI7Z0JBQ2pCUyxzQkFBc0JoQixZQUFZSyxJQUFJLENBQUNZLGFBQWE7Z0JBQ3BEQyxrQkFBa0JsQixZQUFZSyxJQUFJLENBQUNjLFNBQVMsTUFBTTtZQUN0RDtRQUNKO1FBRUEsTUFBTW5CLFlBQVlHLFNBQVMsQ0FBQyxDQUFDLHNDQUFzQyxDQUFDO0lBQ3hFLEVBQUUsT0FBT2lCLE9BQU87UUFDWkMsUUFBUUQsS0FBSyxDQUFDLHdCQUF3QkE7UUFDdEMsT0FBT3BCLFlBQVlHLFNBQVMsQ0FBQztJQUNqQztBQUVKLENBQUEsRUFBQyJ9