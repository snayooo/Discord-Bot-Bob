import db from "../utils/DBUtils.js";
export default (async (member)=>{
    const userId = member.id;
    const username = member.user.username;
    const avatarUrl = member.user.displayAvatarURL({
        size: 1024,
        extension: 'png'
    });
    const dbUser = await db.user.findUnique({
        where: {
            id: userId
        }
    });
    if (!userId || !username || !avatarUrl) {
        console.log(`Missing user information for member ${member.id}`);
        return true;
    }
    if (dbUser) {
        console.log(`User ${username} (${userId}) already exists in the database.`);
        return true;
    }
    await db.user.create({
        data: {
            discordUserId: userId,
            discordUsername: username,
            discordAvatarUrl: avatarUrl,
            discordDiscriminator: member.user.discriminator
        }
    });
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6XFxEZXZlbG9wZW1lbnRcXERpc2NvcmQgQm90c1xcSmF2YVNjcmlwdFxcQm9iXFxzcmNcXGV2ZW50c1xcZ3VpbGRNZW1iZXJBZGQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR3VpbGRNZW1iZXIgfSBmcm9tICdkaXNjb3JkLmpzJ1xyXG5pbXBvcnQgeyBjbGllbnQgfSBmcm9tICdyb2JvLmpzJ1xyXG5pbXBvcnQgZGIgZnJvbSAnLi4vdXRpbHMvREJVdGlscydcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChtZW1iZXI6IEd1aWxkTWVtYmVyKSA9PiB7XHJcblx0Y29uc3QgdXNlcklkID0gbWVtYmVyLmlkXHJcblx0Y29uc3QgdXNlcm5hbWUgPSBtZW1iZXIudXNlci51c2VybmFtZVxyXG5cdGNvbnN0IGF2YXRhclVybCA9IG1lbWJlci51c2VyLmRpc3BsYXlBdmF0YXJVUkwoeyBzaXplOiAxMDI0LCBleHRlbnNpb246ICdwbmcnIH0pXHJcblxyXG5cdGNvbnN0IGRiVXNlciA9IGF3YWl0IGRiLnVzZXIuZmluZFVuaXF1ZSh7IHdoZXJlOiB7IGlkOiB1c2VySWQgfSB9KVxyXG5cclxuXHRpZiAoIXVzZXJJZCB8fCAhdXNlcm5hbWUgfHwgIWF2YXRhclVybCkge1xyXG5cdFx0Y29uc29sZS5sb2coYE1pc3NpbmcgdXNlciBpbmZvcm1hdGlvbiBmb3IgbWVtYmVyICR7bWVtYmVyLmlkfWApXHJcblx0XHRyZXR1cm4gdHJ1ZVxyXG5cdH1cclxuXHJcblx0aWYgKGRiVXNlcikge1xyXG5cdFx0Y29uc29sZS5sb2coYFVzZXIgJHt1c2VybmFtZX0gKCR7dXNlcklkfSkgYWxyZWFkeSBleGlzdHMgaW4gdGhlIGRhdGFiYXNlLmApXHJcblxyXG5cdFx0cmV0dXJuIHRydWVcclxuXHR9XHJcblxyXG5cdGF3YWl0IGRiLnVzZXIuY3JlYXRlKHtcclxuXHRcdGRhdGE6IHtcclxuXHRcdFx0ZGlzY29yZFVzZXJJZDogdXNlcklkLFxyXG5cdFx0XHRkaXNjb3JkVXNlcm5hbWU6IHVzZXJuYW1lLFxyXG5cdFx0XHRkaXNjb3JkQXZhdGFyVXJsOiBhdmF0YXJVcmwsXHJcblx0XHRcdGRpc2NvcmREaXNjcmltaW5hdG9yOiBtZW1iZXIudXNlci5kaXNjcmltaW5hdG9yXHJcblx0XHR9XHJcblx0fSlcclxufVxyXG4iXSwibmFtZXMiOlsiZGIiLCJtZW1iZXIiLCJ1c2VySWQiLCJpZCIsInVzZXJuYW1lIiwidXNlciIsImF2YXRhclVybCIsImRpc3BsYXlBdmF0YXJVUkwiLCJzaXplIiwiZXh0ZW5zaW9uIiwiZGJVc2VyIiwiZmluZFVuaXF1ZSIsIndoZXJlIiwiY29uc29sZSIsImxvZyIsImNyZWF0ZSIsImRhdGEiLCJkaXNjb3JkVXNlcklkIiwiZGlzY29yZFVzZXJuYW1lIiwiZGlzY29yZEF2YXRhclVybCIsImRpc2NvcmREaXNjcmltaW5hdG9yIiwiZGlzY3JpbWluYXRvciJdLCJtYXBwaW5ncyI6IkFBRUEsT0FBT0EsUUFBUSxzQkFBa0I7QUFFakMsZUFBZSxDQUFBLE9BQU9DO0lBQ3JCLE1BQU1DLFNBQVNELE9BQU9FLEVBQUU7SUFDeEIsTUFBTUMsV0FBV0gsT0FBT0ksSUFBSSxDQUFDRCxRQUFRO0lBQ3JDLE1BQU1FLFlBQVlMLE9BQU9JLElBQUksQ0FBQ0UsZ0JBQWdCLENBQUM7UUFBRUMsTUFBTTtRQUFNQyxXQUFXO0lBQU07SUFFOUUsTUFBTUMsU0FBUyxNQUFNVixHQUFHSyxJQUFJLENBQUNNLFVBQVUsQ0FBQztRQUFFQyxPQUFPO1lBQUVULElBQUlEO1FBQU87SUFBRTtJQUVoRSxJQUFJLENBQUNBLFVBQVUsQ0FBQ0UsWUFBWSxDQUFDRSxXQUFXO1FBQ3ZDTyxRQUFRQyxHQUFHLENBQUMsQ0FBQyxvQ0FBb0MsRUFBRWIsT0FBT0UsRUFBRSxFQUFFO1FBQzlELE9BQU87SUFDUjtJQUVBLElBQUlPLFFBQVE7UUFDWEcsUUFBUUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFVixTQUFTLEVBQUUsRUFBRUYsT0FBTyxpQ0FBaUMsQ0FBQztRQUUxRSxPQUFPO0lBQ1I7SUFFQSxNQUFNRixHQUFHSyxJQUFJLENBQUNVLE1BQU0sQ0FBQztRQUNwQkMsTUFBTTtZQUNMQyxlQUFlZjtZQUNmZ0IsaUJBQWlCZDtZQUNqQmUsa0JBQWtCYjtZQUNsQmMsc0JBQXNCbkIsT0FBT0ksSUFBSSxDQUFDZ0IsYUFBYTtRQUNoRDtJQUNEO0FBQ0QsQ0FBQSxFQUFDIn0=