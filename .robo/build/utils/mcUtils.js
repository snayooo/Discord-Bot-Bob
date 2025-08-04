import { EmbedBuilder } from "discord.js";
import db from "./DBUtils.js";
import axios from "axios";
export async function serverEmbed(value) {
    if (!value) {
        throw new Error('Server name is required.');
    }
    const dbServer = await db.server.findFirst({
        where: {
            value: value
        }
    });
    if (!dbServer) {
        throw new Error(`Server ${value} not found in the database.`);
    }
    let status = 'Unknown';
    let onlinePlayers = 0;
    let maxPlayers = 0;
    try {
        const res = await axios.get(`https://api.mcsrvstat.us/3/${dbServer.ip}:${dbServer.port}`);
        const data = res.data;
        if (data.online) {
            status = '🟢Online';
            onlinePlayers = data.players.online;
            maxPlayers = data.players.max;
        } else {
            status = '🔴Offline';
        }
    } catch (error) {
        console.error(`Error fetching server status for ${dbServer.name}:`, error);
        throw new Error(`Failed to fetch server status for ${dbServer.name}.`);
    }
    const mcserver = {
        name: dbServer.name,
        value: dbServer.value,
        connectionIp: dbServer.connIp,
        ip: dbServer.ip,
        port: dbServer.port,
        rconPort: dbServer.rconPort,
        rconPassword: dbServer.rconPassword,
        sshUsername: dbServer.sshUser,
        sshPassword: dbServer.sshPassword,
        maxPlayers: maxPlayers,
        onlinePlayers: onlinePlayers,
        status: status
    };
    const embed = new EmbedBuilder().setTitle(`__**Panel for ${mcserver.name}**__`).setDescription(`Here you can see information about the server.`).addFields({
        name: '**IP:**',
        value: `${mcserver.connectionIp}`
    }).addFields({
        name: '**Players:**',
        value: `${mcserver.onlinePlayers}/${mcserver.maxPlayers}`
    }).addFields({
        name: '**Status:**',
        value: `${mcserver.status}`
    }).setColor('Green').setTimestamp();
    return embed;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6XFxEZXZlbG9wZW1lbnRcXERpc2NvcmQgQm90c1xcSmF2YVNjcmlwdFxcQm9iXFxzcmNcXHV0aWxzXFxtY1V0aWxzLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVtYmVkQnVpbGRlciB9IGZyb20gJ2Rpc2NvcmQuanMnXHJcbmltcG9ydCBkYiBmcm9tICcuL0RCVXRpbHMnXHJcbmltcG9ydCBheGlvcyBmcm9tICdheGlvcydcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZXJ2ZXJFbWJlZCh2YWx1ZTogc3RyaW5nKSB7XHJcblx0aWYgKCF2YWx1ZSkge1xyXG5cdFx0dGhyb3cgbmV3IEVycm9yKCdTZXJ2ZXIgbmFtZSBpcyByZXF1aXJlZC4nKVxyXG5cdH1cclxuXHJcblx0Y29uc3QgZGJTZXJ2ZXIgPSBhd2FpdCBkYi5zZXJ2ZXIuZmluZEZpcnN0KHtcclxuXHRcdHdoZXJlOiB7XHJcblx0XHRcdHZhbHVlOiB2YWx1ZVxyXG5cdFx0fVxyXG5cdH0pXHJcblxyXG5cdGlmICghZGJTZXJ2ZXIpIHtcclxuXHRcdHRocm93IG5ldyBFcnJvcihgU2VydmVyICR7dmFsdWV9IG5vdCBmb3VuZCBpbiB0aGUgZGF0YWJhc2UuYClcclxuXHR9XHJcblxyXG4gICAgbGV0IHN0YXR1czogc3RyaW5nID0gJ1Vua25vd24nXHJcbiAgICBsZXQgb25saW5lUGxheWVyczogbnVtYmVyID0gMFxyXG4gICAgbGV0IG1heFBsYXllcnM6IG51bWJlciA9IDBcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGF4aW9zLmdldChgaHR0cHM6Ly9hcGkubWNzcnZzdGF0LnVzLzMvJHtkYlNlcnZlci5pcH06JHtkYlNlcnZlci5wb3J0fWApXHJcblxyXG4gICAgICAgIGNvbnN0IGRhdGEgPSByZXMuZGF0YVxyXG5cclxuICAgICAgICBpZiAoZGF0YS5vbmxpbmUpIHtcclxuICAgICAgICAgICAgc3RhdHVzID0gJ/Cfn6JPbmxpbmUnXHJcbiAgICAgICAgICAgIG9ubGluZVBsYXllcnMgPSBkYXRhLnBsYXllcnMub25saW5lXHJcbiAgICAgICAgICAgIG1heFBsYXllcnMgPSBkYXRhLnBsYXllcnMubWF4XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc3RhdHVzID0gJ/CflLRPZmZsaW5lJ1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYEVycm9yIGZldGNoaW5nIHNlcnZlciBzdGF0dXMgZm9yICR7ZGJTZXJ2ZXIubmFtZX06YCwgZXJyb3IpXHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBGYWlsZWQgdG8gZmV0Y2ggc2VydmVyIHN0YXR1cyBmb3IgJHtkYlNlcnZlci5uYW1lfS5gKVxyXG4gICAgfVxyXG5cclxuXHRjb25zdCBtY3NlcnZlciA9IHtcclxuXHRcdG5hbWU6IGRiU2VydmVyLm5hbWUsXHJcblx0XHR2YWx1ZTogZGJTZXJ2ZXIudmFsdWUsXHJcblx0XHRjb25uZWN0aW9uSXA6IGRiU2VydmVyLmNvbm5JcCxcclxuXHRcdGlwOiBkYlNlcnZlci5pcCxcclxuXHRcdHBvcnQ6IGRiU2VydmVyLnBvcnQsXHJcblx0XHRyY29uUG9ydDogZGJTZXJ2ZXIucmNvblBvcnQsXHJcblx0XHRyY29uUGFzc3dvcmQ6IGRiU2VydmVyLnJjb25QYXNzd29yZCxcclxuXHRcdHNzaFVzZXJuYW1lOiBkYlNlcnZlci5zc2hVc2VyLFxyXG5cdFx0c3NoUGFzc3dvcmQ6IGRiU2VydmVyLnNzaFBhc3N3b3JkLFxyXG4gICAgICAgIG1heFBsYXllcnM6IG1heFBsYXllcnMsXHJcbiAgICAgICAgb25saW5lUGxheWVyczogb25saW5lUGxheWVycyxcclxuICAgICAgICBzdGF0dXM6IHN0YXR1c1xyXG5cdH1cclxuXHJcblx0Y29uc3QgZW1iZWQgPSBuZXcgRW1iZWRCdWlsZGVyKClcclxuXHRcdC5zZXRUaXRsZShgX18qKlBhbmVsIGZvciAke21jc2VydmVyLm5hbWV9KipfX2ApXHJcblx0XHQuc2V0RGVzY3JpcHRpb24oYEhlcmUgeW91IGNhbiBzZWUgaW5mb3JtYXRpb24gYWJvdXQgdGhlIHNlcnZlci5gKVxyXG5cdFx0LmFkZEZpZWxkcyh7IG5hbWU6ICcqKklQOioqJywgdmFsdWU6IGAke21jc2VydmVyLmNvbm5lY3Rpb25JcH1gIH0pXHJcbiAgICAgICAgLmFkZEZpZWxkcyh7IG5hbWU6ICcqKlBsYXllcnM6KionLCB2YWx1ZTogYCR7bWNzZXJ2ZXIub25saW5lUGxheWVyc30vJHttY3NlcnZlci5tYXhQbGF5ZXJzfWAgfSlcclxuICAgICAgICAuYWRkRmllbGRzKHsgbmFtZTogJyoqU3RhdHVzOioqJywgdmFsdWU6IGAke21jc2VydmVyLnN0YXR1c31gIH0pXHJcbiAgICAgICAgLnNldENvbG9yKCdHcmVlbicpXHJcbiAgICAgICAgLnNldFRpbWVzdGFtcCgpXHJcblxyXG5cdHJldHVybiBlbWJlZFxyXG59XHJcbiJdLCJuYW1lcyI6WyJFbWJlZEJ1aWxkZXIiLCJkYiIsImF4aW9zIiwic2VydmVyRW1iZWQiLCJ2YWx1ZSIsIkVycm9yIiwiZGJTZXJ2ZXIiLCJzZXJ2ZXIiLCJmaW5kRmlyc3QiLCJ3aGVyZSIsInN0YXR1cyIsIm9ubGluZVBsYXllcnMiLCJtYXhQbGF5ZXJzIiwicmVzIiwiZ2V0IiwiaXAiLCJwb3J0IiwiZGF0YSIsIm9ubGluZSIsInBsYXllcnMiLCJtYXgiLCJlcnJvciIsImNvbnNvbGUiLCJuYW1lIiwibWNzZXJ2ZXIiLCJjb25uZWN0aW9uSXAiLCJjb25uSXAiLCJyY29uUG9ydCIsInJjb25QYXNzd29yZCIsInNzaFVzZXJuYW1lIiwic3NoVXNlciIsInNzaFBhc3N3b3JkIiwiZW1iZWQiLCJzZXRUaXRsZSIsInNldERlc2NyaXB0aW9uIiwiYWRkRmllbGRzIiwic2V0Q29sb3IiLCJzZXRUaW1lc3RhbXAiXSwibWFwcGluZ3MiOiJBQUFBLFNBQVNBLFlBQVksUUFBUSxhQUFZO0FBQ3pDLE9BQU9DLFFBQVEsZUFBVztBQUMxQixPQUFPQyxXQUFXLFFBQU87QUFFekIsT0FBTyxlQUFlQyxZQUFZQyxLQUFhO0lBQzlDLElBQUksQ0FBQ0EsT0FBTztRQUNYLE1BQU0sSUFBSUMsTUFBTTtJQUNqQjtJQUVBLE1BQU1DLFdBQVcsTUFBTUwsR0FBR00sTUFBTSxDQUFDQyxTQUFTLENBQUM7UUFDMUNDLE9BQU87WUFDTkwsT0FBT0E7UUFDUjtJQUNEO0lBRUEsSUFBSSxDQUFDRSxVQUFVO1FBQ2QsTUFBTSxJQUFJRCxNQUFNLENBQUMsT0FBTyxFQUFFRCxNQUFNLDJCQUEyQixDQUFDO0lBQzdEO0lBRUcsSUFBSU0sU0FBaUI7SUFDckIsSUFBSUMsZ0JBQXdCO0lBQzVCLElBQUlDLGFBQXFCO0lBRXpCLElBQUk7UUFFQSxNQUFNQyxNQUFNLE1BQU1YLE1BQU1ZLEdBQUcsQ0FBQyxDQUFDLDJCQUEyQixFQUFFUixTQUFTUyxFQUFFLENBQUMsQ0FBQyxFQUFFVCxTQUFTVSxJQUFJLEVBQUU7UUFFeEYsTUFBTUMsT0FBT0osSUFBSUksSUFBSTtRQUVyQixJQUFJQSxLQUFLQyxNQUFNLEVBQUU7WUFDYlIsU0FBUztZQUNUQyxnQkFBZ0JNLEtBQUtFLE9BQU8sQ0FBQ0QsTUFBTTtZQUNuQ04sYUFBYUssS0FBS0UsT0FBTyxDQUFDQyxHQUFHO1FBQ2pDLE9BQU87WUFDSFYsU0FBUztRQUNiO0lBRUosRUFBRSxPQUFPVyxPQUFPO1FBQ1pDLFFBQVFELEtBQUssQ0FBQyxDQUFDLGlDQUFpQyxFQUFFZixTQUFTaUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFRjtRQUNwRSxNQUFNLElBQUloQixNQUFNLENBQUMsa0NBQWtDLEVBQUVDLFNBQVNpQixJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3pFO0lBRUgsTUFBTUMsV0FBVztRQUNoQkQsTUFBTWpCLFNBQVNpQixJQUFJO1FBQ25CbkIsT0FBT0UsU0FBU0YsS0FBSztRQUNyQnFCLGNBQWNuQixTQUFTb0IsTUFBTTtRQUM3QlgsSUFBSVQsU0FBU1MsRUFBRTtRQUNmQyxNQUFNVixTQUFTVSxJQUFJO1FBQ25CVyxVQUFVckIsU0FBU3FCLFFBQVE7UUFDM0JDLGNBQWN0QixTQUFTc0IsWUFBWTtRQUNuQ0MsYUFBYXZCLFNBQVN3QixPQUFPO1FBQzdCQyxhQUFhekIsU0FBU3lCLFdBQVc7UUFDM0JuQixZQUFZQTtRQUNaRCxlQUFlQTtRQUNmRCxRQUFRQTtJQUNmO0lBRUEsTUFBTXNCLFFBQVEsSUFBSWhDLGVBQ2hCaUMsUUFBUSxDQUFDLENBQUMsY0FBYyxFQUFFVCxTQUFTRCxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQzdDVyxjQUFjLENBQUMsQ0FBQyw4Q0FBOEMsQ0FBQyxFQUMvREMsU0FBUyxDQUFDO1FBQUVaLE1BQU07UUFBV25CLE9BQU8sR0FBR29CLFNBQVNDLFlBQVksRUFBRTtJQUFDLEdBQ3pEVSxTQUFTLENBQUM7UUFBRVosTUFBTTtRQUFnQm5CLE9BQU8sR0FBR29CLFNBQVNiLGFBQWEsQ0FBQyxDQUFDLEVBQUVhLFNBQVNaLFVBQVUsRUFBRTtJQUFDLEdBQzVGdUIsU0FBUyxDQUFDO1FBQUVaLE1BQU07UUFBZW5CLE9BQU8sR0FBR29CLFNBQVNkLE1BQU0sRUFBRTtJQUFDLEdBQzdEMEIsUUFBUSxDQUFDLFNBQ1RDLFlBQVk7SUFFcEIsT0FBT0w7QUFDUiJ9