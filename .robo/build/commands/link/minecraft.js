import { createCommandConfig } from "robo.js";
import db from "../../utils/DBUtils.js";
export const config = createCommandConfig({
    description: 'Links your Discord account with your Minecraft account.',
    options: [
        {
            name: 'username',
            description: 'Your Minecraft username',
            type: 'string',
            required: true
        }
    ]
});
export default (async (interaction)=>{
    await interaction.deferReply({
        ephemeral: true
    });
    const userId = interaction.user.id;
    const username = interaction.user.username;
    const dbUser = await db.user.findUnique({
        where: {
            discordUserId: userId,
            discordUsername: username
        }
    });
    if (!dbUser) {
        return interaction.editReply('You already have a Minecraft account linked! If you want to change it, please contact @snayo.');
    }
    const minecraftUsername = await interaction.options.getString('username');
    if (!minecraftUsername) {
        return interaction.editReply('Please provide a valid Minecraft username.');
    }
    try {
        const res = await fetch(`https://playerdb.co/api/player/minecraft/${minecraftUsername}`);
        const json = await res.json();
        const uuid = json.data.player.id;
        const updatedUser = await db.user.update({
            where: {
                discordUserId: userId
            },
            data: {
                minecraftUsername: minecraftUsername,
                minecraftId: uuid
            }
        });
    } catch (error) {
        console.error('Error linking Minecraft account:', error);
        return interaction.editReply('There was an error linking your Minecraft account. Please try again later.');
    }
    await interaction.editReply(`Your Minecraft account **${minecraftUsername}** has been successfully linked!`);
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6XFxEZXZlbG9wZW1lbnRcXERpc2NvcmQgQm90c1xcSmF2YVNjcmlwdFxcQm9iXFxzcmNcXGNvbW1hbmRzXFxsaW5rXFxtaW5lY3JhZnQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhdElucHV0Q29tbWFuZEludGVyYWN0aW9uIH0gZnJvbSAnZGlzY29yZC5qcydcclxuaW1wb3J0IHsgY3JlYXRlQ29tbWFuZENvbmZpZyB9IGZyb20gJ3JvYm8uanMnXHJcbmltcG9ydCBkYiBmcm9tICcuLi8uLi91dGlscy9EQlV0aWxzJ1xyXG5cclxuZXhwb3J0IGNvbnN0IGNvbmZpZyA9IGNyZWF0ZUNvbW1hbmRDb25maWcoe1xyXG5cdGRlc2NyaXB0aW9uOiAnTGlua3MgeW91ciBEaXNjb3JkIGFjY291bnQgd2l0aCB5b3VyIE1pbmVjcmFmdCBhY2NvdW50LicsXHJcblx0b3B0aW9uczogW1xyXG5cdFx0e1xyXG5cdFx0XHRuYW1lOiAndXNlcm5hbWUnLFxyXG5cdFx0XHRkZXNjcmlwdGlvbjogJ1lvdXIgTWluZWNyYWZ0IHVzZXJuYW1lJyxcclxuXHRcdFx0dHlwZTogJ3N0cmluZycsXHJcblx0XHRcdHJlcXVpcmVkOiB0cnVlXHJcblx0XHR9XHJcblx0XVxyXG59IGFzIGNvbnN0KVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgKGludGVyYWN0aW9uOiBDaGF0SW5wdXRDb21tYW5kSW50ZXJhY3Rpb24pID0+IHtcclxuXHRhd2FpdCBpbnRlcmFjdGlvbi5kZWZlclJlcGx5KHsgZXBoZW1lcmFsOiB0cnVlIH0pXHJcblxyXG5cdGNvbnN0IHVzZXJJZCA9IGludGVyYWN0aW9uLnVzZXIuaWRcclxuXHRjb25zdCB1c2VybmFtZSA9IGludGVyYWN0aW9uLnVzZXIudXNlcm5hbWVcclxuXHJcblx0Y29uc3QgZGJVc2VyID0gYXdhaXQgZGIudXNlci5maW5kVW5pcXVlKHtcclxuXHRcdHdoZXJlOiB7XHJcblx0XHRcdGRpc2NvcmRVc2VySWQ6IHVzZXJJZCxcclxuXHRcdFx0ZGlzY29yZFVzZXJuYW1lOiB1c2VybmFtZVxyXG5cdFx0fVxyXG5cdH0pXHJcblxyXG5cdGlmICghZGJVc2VyKSB7XHJcblx0XHRyZXR1cm4gaW50ZXJhY3Rpb24uZWRpdFJlcGx5KFxyXG5cdFx0XHQnWW91IGFscmVhZHkgaGF2ZSBhIE1pbmVjcmFmdCBhY2NvdW50IGxpbmtlZCEgSWYgeW91IHdhbnQgdG8gY2hhbmdlIGl0LCBwbGVhc2UgY29udGFjdCBAc25heW8uJ1xyXG5cdFx0KVxyXG5cdH1cclxuXHJcblx0Y29uc3QgbWluZWNyYWZ0VXNlcm5hbWUgPSBhd2FpdCBpbnRlcmFjdGlvbi5vcHRpb25zLmdldFN0cmluZygndXNlcm5hbWUnKVxyXG5cclxuXHRpZiAoIW1pbmVjcmFmdFVzZXJuYW1lKSB7XHJcblx0XHRyZXR1cm4gaW50ZXJhY3Rpb24uZWRpdFJlcGx5KCdQbGVhc2UgcHJvdmlkZSBhIHZhbGlkIE1pbmVjcmFmdCB1c2VybmFtZS4nKVxyXG5cdH1cclxuXHJcblx0dHJ5IHtcclxuXHRcdGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKGBodHRwczovL3BsYXllcmRiLmNvL2FwaS9wbGF5ZXIvbWluZWNyYWZ0LyR7bWluZWNyYWZ0VXNlcm5hbWV9YClcclxuXHRcdGNvbnN0IGpzb24gPSAoYXdhaXQgcmVzLmpzb24oKSkgYXMgeyBkYXRhOiB7IHBsYXllcjogeyBpZDogc3RyaW5nIH0gfSB9XHJcblx0XHRjb25zdCB1dWlkID0ganNvbi5kYXRhLnBsYXllci5pZFxyXG5cclxuXHRcdGNvbnN0IHVwZGF0ZWRVc2VyID0gYXdhaXQgZGIudXNlci51cGRhdGUoe1xyXG5cdFx0XHR3aGVyZToge1xyXG5cdFx0XHRcdGRpc2NvcmRVc2VySWQ6IHVzZXJJZFxyXG5cdFx0XHR9LFxyXG5cdFx0XHRkYXRhOiB7XHJcblx0XHRcdFx0bWluZWNyYWZ0VXNlcm5hbWU6IG1pbmVjcmFmdFVzZXJuYW1lLFxyXG5cdFx0XHRcdG1pbmVjcmFmdElkOiB1dWlkXHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fSBjYXRjaCAoZXJyb3IpIHtcclxuXHRcdGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGxpbmtpbmcgTWluZWNyYWZ0IGFjY291bnQ6JywgZXJyb3IpXHJcblx0XHRyZXR1cm4gaW50ZXJhY3Rpb24uZWRpdFJlcGx5KCdUaGVyZSB3YXMgYW4gZXJyb3IgbGlua2luZyB5b3VyIE1pbmVjcmFmdCBhY2NvdW50LiBQbGVhc2UgdHJ5IGFnYWluIGxhdGVyLicpXHJcblx0fVxyXG5cclxuICAgIGF3YWl0IGludGVyYWN0aW9uLmVkaXRSZXBseShgWW91ciBNaW5lY3JhZnQgYWNjb3VudCAqKiR7bWluZWNyYWZ0VXNlcm5hbWV9KiogaGFzIGJlZW4gc3VjY2Vzc2Z1bGx5IGxpbmtlZCFgKVxyXG59XHJcbiJdLCJuYW1lcyI6WyJjcmVhdGVDb21tYW5kQ29uZmlnIiwiZGIiLCJjb25maWciLCJkZXNjcmlwdGlvbiIsIm9wdGlvbnMiLCJuYW1lIiwidHlwZSIsInJlcXVpcmVkIiwiaW50ZXJhY3Rpb24iLCJkZWZlclJlcGx5IiwiZXBoZW1lcmFsIiwidXNlcklkIiwidXNlciIsImlkIiwidXNlcm5hbWUiLCJkYlVzZXIiLCJmaW5kVW5pcXVlIiwid2hlcmUiLCJkaXNjb3JkVXNlcklkIiwiZGlzY29yZFVzZXJuYW1lIiwiZWRpdFJlcGx5IiwibWluZWNyYWZ0VXNlcm5hbWUiLCJnZXRTdHJpbmciLCJyZXMiLCJmZXRjaCIsImpzb24iLCJ1dWlkIiwiZGF0YSIsInBsYXllciIsInVwZGF0ZWRVc2VyIiwidXBkYXRlIiwibWluZWNyYWZ0SWQiLCJlcnJvciIsImNvbnNvbGUiXSwibWFwcGluZ3MiOiJBQUNBLFNBQVNBLG1CQUFtQixRQUFRLFVBQVM7QUFDN0MsT0FBT0MsUUFBUSx5QkFBcUI7QUFFcEMsT0FBTyxNQUFNQyxTQUFTRixvQkFBb0I7SUFDekNHLGFBQWE7SUFDYkMsU0FBUztRQUNSO1lBQ0NDLE1BQU07WUFDTkYsYUFBYTtZQUNiRyxNQUFNO1lBQ05DLFVBQVU7UUFDWDtLQUNBO0FBQ0YsR0FBVztBQUVYLGVBQWUsQ0FBQSxPQUFPQztJQUNyQixNQUFNQSxZQUFZQyxVQUFVLENBQUM7UUFBRUMsV0FBVztJQUFLO0lBRS9DLE1BQU1DLFNBQVNILFlBQVlJLElBQUksQ0FBQ0MsRUFBRTtJQUNsQyxNQUFNQyxXQUFXTixZQUFZSSxJQUFJLENBQUNFLFFBQVE7SUFFMUMsTUFBTUMsU0FBUyxNQUFNZCxHQUFHVyxJQUFJLENBQUNJLFVBQVUsQ0FBQztRQUN2Q0MsT0FBTztZQUNOQyxlQUFlUDtZQUNmUSxpQkFBaUJMO1FBQ2xCO0lBQ0Q7SUFFQSxJQUFJLENBQUNDLFFBQVE7UUFDWixPQUFPUCxZQUFZWSxTQUFTLENBQzNCO0lBRUY7SUFFQSxNQUFNQyxvQkFBb0IsTUFBTWIsWUFBWUosT0FBTyxDQUFDa0IsU0FBUyxDQUFDO0lBRTlELElBQUksQ0FBQ0QsbUJBQW1CO1FBQ3ZCLE9BQU9iLFlBQVlZLFNBQVMsQ0FBQztJQUM5QjtJQUVBLElBQUk7UUFDSCxNQUFNRyxNQUFNLE1BQU1DLE1BQU0sQ0FBQyx5Q0FBeUMsRUFBRUgsbUJBQW1CO1FBQ3ZGLE1BQU1JLE9BQVEsTUFBTUYsSUFBSUUsSUFBSTtRQUM1QixNQUFNQyxPQUFPRCxLQUFLRSxJQUFJLENBQUNDLE1BQU0sQ0FBQ2YsRUFBRTtRQUVoQyxNQUFNZ0IsY0FBYyxNQUFNNUIsR0FBR1csSUFBSSxDQUFDa0IsTUFBTSxDQUFDO1lBQ3hDYixPQUFPO2dCQUNOQyxlQUFlUDtZQUNoQjtZQUNBZ0IsTUFBTTtnQkFDTE4sbUJBQW1CQTtnQkFDbkJVLGFBQWFMO1lBQ2Q7UUFDRDtJQUNELEVBQUUsT0FBT00sT0FBTztRQUNmQyxRQUFRRCxLQUFLLENBQUMsb0NBQW9DQTtRQUNsRCxPQUFPeEIsWUFBWVksU0FBUyxDQUFDO0lBQzlCO0lBRUcsTUFBTVosWUFBWVksU0FBUyxDQUFDLENBQUMseUJBQXlCLEVBQUVDLGtCQUFrQixnQ0FBZ0MsQ0FBQztBQUMvRyxDQUFBLEVBQUMifQ==