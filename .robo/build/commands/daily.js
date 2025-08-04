import { createCommandConfig } from "robo.js";
import db from "../utils/DBUtils.js";
export const config = createCommandConfig({
    description: 'Collect your daily coins.'
});
export default (async (interaction)=>{
    await interaction.deferReply({
        ephemeral: true
    });
    const user = interaction.user;
    const dbUser = await db.user.findUnique({
        where: {
            discordUserId: user.id
        }
    });
    if (!dbUser) {
        return interaction.editReply({
            content: 'You need to register first using the `/register` command.'
        });
    }
    const today = new Date().toDateString();
    const lastDaily = dbUser.lastDailyReward?.toDateString();
    if (lastDaily === today) {
        return interaction.editReply({
            content: 'You have already claimed your daily reward today.'
        });
    }
    const reward = Math.floor(Math.random() * 100) + 50 // Random reward between 50 and 150 coins
    ;
    const updatedUser = await db.user.update({
        where: {
            discordUserId: user.id
        },
        data: {
            coins: {
                increment: reward
            },
            lastDailyReward: new Date()
        }
    });
    await interaction.editReply({
        content: `You have claimed your daily reward of **${reward}** coins! Your total coins are now **${updatedUser.coins}**.`
    });
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6XFxEZXZlbG9wZW1lbnRcXERpc2NvcmQgQm90c1xcSmF2YVNjcmlwdFxcQm9iXFxzcmNcXGNvbW1hbmRzXFxkYWlseS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGF0SW5wdXRDb21tYW5kSW50ZXJhY3Rpb24gfSBmcm9tICdkaXNjb3JkLmpzJ1xyXG5pbXBvcnQgeyBjcmVhdGVDb21tYW5kQ29uZmlnIH0gZnJvbSAncm9iby5qcydcclxuaW1wb3J0IGRiIGZyb20gJy4uL3V0aWxzL0RCVXRpbHMnXHJcblxyXG5leHBvcnQgY29uc3QgY29uZmlnID0gY3JlYXRlQ29tbWFuZENvbmZpZyh7XHJcblx0ZGVzY3JpcHRpb246ICdDb2xsZWN0IHlvdXIgZGFpbHkgY29pbnMuJ1xyXG59IGFzIGNvbnN0KVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgKGludGVyYWN0aW9uOiBDaGF0SW5wdXRDb21tYW5kSW50ZXJhY3Rpb24pID0+IHtcclxuXHRhd2FpdCBpbnRlcmFjdGlvbi5kZWZlclJlcGx5KHsgZXBoZW1lcmFsOiB0cnVlIH0pXHJcblxyXG5cdGNvbnN0IHVzZXIgPSBpbnRlcmFjdGlvbi51c2VyXHJcblxyXG5cdGNvbnN0IGRiVXNlciA9IGF3YWl0IGRiLnVzZXIuZmluZFVuaXF1ZSh7XHJcblx0XHR3aGVyZToge1xyXG5cdFx0XHRkaXNjb3JkVXNlcklkOiB1c2VyLmlkXHJcblx0XHR9XHJcblx0fSlcclxuXHJcblx0aWYgKCFkYlVzZXIpIHtcclxuXHRcdHJldHVybiBpbnRlcmFjdGlvbi5lZGl0UmVwbHkoe1xyXG5cdFx0XHRjb250ZW50OiAnWW91IG5lZWQgdG8gcmVnaXN0ZXIgZmlyc3QgdXNpbmcgdGhlIGAvcmVnaXN0ZXJgIGNvbW1hbmQuJ1xyXG5cdFx0fSlcclxuXHR9XHJcblxyXG4gICAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpLnRvRGF0ZVN0cmluZygpXHJcbiAgICBjb25zdCBsYXN0RGFpbHkgPSBkYlVzZXIubGFzdERhaWx5UmV3YXJkPy50b0RhdGVTdHJpbmcoKVxyXG5cclxuICAgIGlmIChsYXN0RGFpbHkgPT09IHRvZGF5KSB7XHJcbiAgICAgICAgcmV0dXJuIGludGVyYWN0aW9uLmVkaXRSZXBseSh7XHJcbiAgICAgICAgICAgIGNvbnRlbnQ6ICdZb3UgaGF2ZSBhbHJlYWR5IGNsYWltZWQgeW91ciBkYWlseSByZXdhcmQgdG9kYXkuJ1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmV3YXJkID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwKSArIDUwIC8vIFJhbmRvbSByZXdhcmQgYmV0d2VlbiA1MCBhbmQgMTUwIGNvaW5zXHJcblxyXG4gICAgY29uc3QgdXBkYXRlZFVzZXIgPSBhd2FpdCBkYi51c2VyLnVwZGF0ZSh7XHJcbiAgICAgICAgd2hlcmU6IHtcclxuICAgICAgICAgICAgZGlzY29yZFVzZXJJZDogdXNlci5pZFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBjb2luczoge1xyXG4gICAgICAgICAgICAgICAgaW5jcmVtZW50OiByZXdhcmRcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbGFzdERhaWx5UmV3YXJkOiBuZXcgRGF0ZSgpXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuXHJcbiAgICBhd2FpdCBpbnRlcmFjdGlvbi5lZGl0UmVwbHkoe1xyXG4gICAgICAgIGNvbnRlbnQ6IGBZb3UgaGF2ZSBjbGFpbWVkIHlvdXIgZGFpbHkgcmV3YXJkIG9mICoqJHtyZXdhcmR9KiogY29pbnMhIFlvdXIgdG90YWwgY29pbnMgYXJlIG5vdyAqKiR7dXBkYXRlZFVzZXIuY29pbnN9KiouYFxyXG4gICAgfSlcclxufVxyXG4iXSwibmFtZXMiOlsiY3JlYXRlQ29tbWFuZENvbmZpZyIsImRiIiwiY29uZmlnIiwiZGVzY3JpcHRpb24iLCJpbnRlcmFjdGlvbiIsImRlZmVyUmVwbHkiLCJlcGhlbWVyYWwiLCJ1c2VyIiwiZGJVc2VyIiwiZmluZFVuaXF1ZSIsIndoZXJlIiwiZGlzY29yZFVzZXJJZCIsImlkIiwiZWRpdFJlcGx5IiwiY29udGVudCIsInRvZGF5IiwiRGF0ZSIsInRvRGF0ZVN0cmluZyIsImxhc3REYWlseSIsImxhc3REYWlseVJld2FyZCIsInJld2FyZCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInVwZGF0ZWRVc2VyIiwidXBkYXRlIiwiZGF0YSIsImNvaW5zIiwiaW5jcmVtZW50Il0sIm1hcHBpbmdzIjoiQUFDQSxTQUFTQSxtQkFBbUIsUUFBUSxVQUFTO0FBQzdDLE9BQU9DLFFBQVEsc0JBQWtCO0FBRWpDLE9BQU8sTUFBTUMsU0FBU0Ysb0JBQW9CO0lBQ3pDRyxhQUFhO0FBQ2QsR0FBVztBQUVYLGVBQWUsQ0FBQSxPQUFPQztJQUNyQixNQUFNQSxZQUFZQyxVQUFVLENBQUM7UUFBRUMsV0FBVztJQUFLO0lBRS9DLE1BQU1DLE9BQU9ILFlBQVlHLElBQUk7SUFFN0IsTUFBTUMsU0FBUyxNQUFNUCxHQUFHTSxJQUFJLENBQUNFLFVBQVUsQ0FBQztRQUN2Q0MsT0FBTztZQUNOQyxlQUFlSixLQUFLSyxFQUFFO1FBQ3ZCO0lBQ0Q7SUFFQSxJQUFJLENBQUNKLFFBQVE7UUFDWixPQUFPSixZQUFZUyxTQUFTLENBQUM7WUFDNUJDLFNBQVM7UUFDVjtJQUNEO0lBRUcsTUFBTUMsUUFBUSxJQUFJQyxPQUFPQyxZQUFZO0lBQ3JDLE1BQU1DLFlBQVlWLE9BQU9XLGVBQWUsRUFBRUY7SUFFMUMsSUFBSUMsY0FBY0gsT0FBTztRQUNyQixPQUFPWCxZQUFZUyxTQUFTLENBQUM7WUFDekJDLFNBQVM7UUFDYjtJQUNKO0lBRUEsTUFBTU0sU0FBU0MsS0FBS0MsS0FBSyxDQUFDRCxLQUFLRSxNQUFNLEtBQUssT0FBTyxHQUFHLHlDQUF5Qzs7SUFFN0YsTUFBTUMsY0FBYyxNQUFNdkIsR0FBR00sSUFBSSxDQUFDa0IsTUFBTSxDQUFDO1FBQ3JDZixPQUFPO1lBQ0hDLGVBQWVKLEtBQUtLLEVBQUU7UUFDMUI7UUFDQWMsTUFBTTtZQUNGQyxPQUFPO2dCQUNIQyxXQUFXUjtZQUNmO1lBQ0FELGlCQUFpQixJQUFJSDtRQUN6QjtJQUNKO0lBRUEsTUFBTVosWUFBWVMsU0FBUyxDQUFDO1FBQ3hCQyxTQUFTLENBQUMsd0NBQXdDLEVBQUVNLE9BQU8scUNBQXFDLEVBQUVJLFlBQVlHLEtBQUssQ0FBQyxHQUFHLENBQUM7SUFDNUg7QUFDSixDQUFBLEVBQUMifQ==