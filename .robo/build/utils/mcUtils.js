import { EmbedBuilder } from "discord.js";
import db from "./DBUtils.js";
import axios from "axios";
import { getRconClient } from "./rconUtils.js";
export async function serverEmbed(value) {
    if (!value) {
        throw new Error('Server name is required.');
    }
    function getTPS(str) {
        const match = str.match(/§a(.{2})/);
        return match ? match[1] : null;
    }
    function extractReservedUsedRAM(text) {
        const line = text.split('\n')[0] // Isolate the first line
        ;
        const phrase = 'Reserved used RAM: §7';
        const startIndex = line.indexOf(phrase);
        // If the phrase is not found on the first line, return an empty string
        if (startIndex === -1) {
            return '';
        }
        // Calculate the starting position of the value and unit
        const startOfResult = startIndex + phrase.length;
        // Find the index of the newline character or the end of the string
        const endOfLineIndex = line.indexOf('\n', startOfResult);
        // Extract the substring containing the value and unit
        if (endOfLineIndex === -1) {
            // If no newline is found, take the rest of the string
            return line.substring(startOfResult).trim();
        } else {
            // Otherwise, take the substring up to the newline
            return line.substring(startOfResult, endOfLineIndex).trim();
        }
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
    let serverSoftware = 'Unknown';
    let memoryUsage = 'Unknown';
    let tps = 'Unknown';
    try {
        const res = await axios.get(`https://api.mcsrvstat.us/3/${dbServer.ip}:${dbServer.port}`);
        const data = res.data;
        if (data.online) {
            status = '🟢Online';
            onlinePlayers = data.players.online;
            maxPlayers = data.players.max;
            serverSoftware = data.software;
            if (serverSoftware == 'Paper') {
                const rcon = await getRconClient(dbServer.value);
                if (rcon) {
                    const rcontps = await rcon.send('tps');
                    tps = getTPS(rcontps);
                    const rconmem = await rcon.send('system');
                    memoryUsage = extractReservedUsedRAM(rconmem);
                }
            }
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
        maxPlayers: maxPlayers,
        onlinePlayers: onlinePlayers,
        status: status,
        serverSoftware: dbServer.serverSoftware,
        memory: memoryUsage,
        tps: tps,
        serverVersion: dbServer.serverVersion
    };
    const embed = new EmbedBuilder().setTitle(`__**Panel for ${mcserver.name}**__`).setDescription(`Here you can see information about the server.`).addFields({
        name: '**Server Software:**',
        value: `${mcserver.serverSoftware}`
    }).addFields({
        name: '**Server Version:**',
        value: `${mcserver.serverVersion}`
    }).addFields({
        name: '**IP:**',
        value: `${"```"}${mcserver.connectionIp}${"```"}`
    }).addFields({
        name: '**Players:**',
        value: `${mcserver.onlinePlayers}/${mcserver.maxPlayers}`
    }).addFields({
        name: '**Status:**',
        value: `${mcserver.status}`
    }).addFields({
        name: '**Memory:**',
        value: `${mcserver.memory}`
    }).addFields({
        name: '**TPS:**',
        value: `${mcserver.tps}`
    }).setColor('Green').setTimestamp();
    return embed;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6XFxEZXZlbG9wZW1lbnRcXERpc2NvcmQgQm90c1xcSmF2YVNjcmlwdFxcQm9iXFxzcmNcXHV0aWxzXFxtY1V0aWxzLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVtYmVkQnVpbGRlciB9IGZyb20gJ2Rpc2NvcmQuanMnXHJcbmltcG9ydCBkYiBmcm9tICcuL0RCVXRpbHMnXHJcbmltcG9ydCBheGlvcyBmcm9tICdheGlvcydcclxuaW1wb3J0IHsgZ2V0UmNvbkNsaWVudCB9IGZyb20gJy4vcmNvblV0aWxzJ1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNlcnZlckVtYmVkKHZhbHVlOiBzdHJpbmcpIHtcclxuXHRpZiAoIXZhbHVlKSB7XHJcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ1NlcnZlciBuYW1lIGlzIHJlcXVpcmVkLicpXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBnZXRUUFMoc3RyOiBzdHJpbmcpOiBzdHJpbmcgfCBudWxsIHtcclxuXHRcdGNvbnN0IG1hdGNoID0gc3RyLm1hdGNoKC/Cp2EoLnsyfSkvKVxyXG5cdFx0cmV0dXJuIG1hdGNoID8gbWF0Y2hbMV0gOiBudWxsXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBleHRyYWN0UmVzZXJ2ZWRVc2VkUkFNKHRleHQ6IHN0cmluZyk6IHN0cmluZyB7XHJcblx0XHRjb25zdCBsaW5lID0gdGV4dC5zcGxpdCgnXFxuJylbMF0gLy8gSXNvbGF0ZSB0aGUgZmlyc3QgbGluZVxyXG5cdFx0Y29uc3QgcGhyYXNlID0gJ1Jlc2VydmVkIHVzZWQgUkFNOiDCpzcnXHJcblx0XHRjb25zdCBzdGFydEluZGV4ID0gbGluZS5pbmRleE9mKHBocmFzZSlcclxuXHJcblx0XHQvLyBJZiB0aGUgcGhyYXNlIGlzIG5vdCBmb3VuZCBvbiB0aGUgZmlyc3QgbGluZSwgcmV0dXJuIGFuIGVtcHR5IHN0cmluZ1xyXG5cdFx0aWYgKHN0YXJ0SW5kZXggPT09IC0xKSB7XHJcblx0XHRcdHJldHVybiAnJ1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIENhbGN1bGF0ZSB0aGUgc3RhcnRpbmcgcG9zaXRpb24gb2YgdGhlIHZhbHVlIGFuZCB1bml0XHJcblx0XHRjb25zdCBzdGFydE9mUmVzdWx0ID0gc3RhcnRJbmRleCArIHBocmFzZS5sZW5ndGhcclxuXHJcblx0XHQvLyBGaW5kIHRoZSBpbmRleCBvZiB0aGUgbmV3bGluZSBjaGFyYWN0ZXIgb3IgdGhlIGVuZCBvZiB0aGUgc3RyaW5nXHJcblx0XHRjb25zdCBlbmRPZkxpbmVJbmRleCA9IGxpbmUuaW5kZXhPZignXFxuJywgc3RhcnRPZlJlc3VsdClcclxuXHJcblx0XHQvLyBFeHRyYWN0IHRoZSBzdWJzdHJpbmcgY29udGFpbmluZyB0aGUgdmFsdWUgYW5kIHVuaXRcclxuXHRcdGlmIChlbmRPZkxpbmVJbmRleCA9PT0gLTEpIHtcclxuXHRcdFx0Ly8gSWYgbm8gbmV3bGluZSBpcyBmb3VuZCwgdGFrZSB0aGUgcmVzdCBvZiB0aGUgc3RyaW5nXHJcblx0XHRcdHJldHVybiBsaW5lLnN1YnN0cmluZyhzdGFydE9mUmVzdWx0KS50cmltKClcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdC8vIE90aGVyd2lzZSwgdGFrZSB0aGUgc3Vic3RyaW5nIHVwIHRvIHRoZSBuZXdsaW5lXHJcblx0XHRcdHJldHVybiBsaW5lLnN1YnN0cmluZyhzdGFydE9mUmVzdWx0LCBlbmRPZkxpbmVJbmRleCkudHJpbSgpXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRjb25zdCBkYlNlcnZlciA9IGF3YWl0IGRiLnNlcnZlci5maW5kRmlyc3Qoe1xyXG5cdFx0d2hlcmU6IHtcclxuXHRcdFx0dmFsdWU6IHZhbHVlXHJcblx0XHR9XHJcblx0fSlcclxuXHJcblx0aWYgKCFkYlNlcnZlcikge1xyXG5cdFx0dGhyb3cgbmV3IEVycm9yKGBTZXJ2ZXIgJHt2YWx1ZX0gbm90IGZvdW5kIGluIHRoZSBkYXRhYmFzZS5gKVxyXG5cdH1cclxuXHJcblx0bGV0IHN0YXR1czogc3RyaW5nID0gJ1Vua25vd24nXHJcblx0bGV0IG9ubGluZVBsYXllcnM6IG51bWJlciA9IDBcclxuXHRsZXQgbWF4UGxheWVyczogbnVtYmVyID0gMFxyXG5cdGxldCBzZXJ2ZXJTb2Z0d2FyZTogc3RyaW5nID0gJ1Vua25vd24nXHJcblx0bGV0IG1lbW9yeVVzYWdlOiBhbnkgPSAnVW5rbm93bidcclxuXHRsZXQgdHBzOiBhbnkgPSAnVW5rbm93bidcclxuXHJcblx0dHJ5IHtcclxuXHRcdGNvbnN0IHJlcyA9IGF3YWl0IGF4aW9zLmdldChgaHR0cHM6Ly9hcGkubWNzcnZzdGF0LnVzLzMvJHtkYlNlcnZlci5pcH06JHtkYlNlcnZlci5wb3J0fWApXHJcblxyXG5cdFx0Y29uc3QgZGF0YSA9IHJlcy5kYXRhXHJcblxyXG5cdFx0aWYgKGRhdGEub25saW5lKSB7XHJcblx0XHRcdHN0YXR1cyA9ICfwn5+iT25saW5lJ1xyXG5cdFx0XHRvbmxpbmVQbGF5ZXJzID0gZGF0YS5wbGF5ZXJzLm9ubGluZVxyXG5cdFx0XHRtYXhQbGF5ZXJzID0gZGF0YS5wbGF5ZXJzLm1heFxyXG5cdFx0XHRzZXJ2ZXJTb2Z0d2FyZSA9IGRhdGEuc29mdHdhcmVcclxuXHJcblx0XHRcdGlmIChzZXJ2ZXJTb2Z0d2FyZSA9PSAnUGFwZXInKSB7XHJcblx0XHRcdFx0Y29uc3QgcmNvbiA9IGF3YWl0IGdldFJjb25DbGllbnQoZGJTZXJ2ZXIudmFsdWUpXHJcblx0XHRcdFx0aWYgKHJjb24pIHtcclxuXHRcdFx0XHRcdGNvbnN0IHJjb250cHMgPSBhd2FpdCByY29uLnNlbmQoJ3RwcycpXHJcblx0XHRcdFx0XHR0cHMgPSBnZXRUUFMocmNvbnRwcylcclxuXHJcblx0XHRcdFx0XHRjb25zdCByY29ubWVtID0gYXdhaXQgcmNvbi5zZW5kKCdzeXN0ZW0nKVxyXG5cdFx0XHRcdFx0bWVtb3J5VXNhZ2UgPSBleHRyYWN0UmVzZXJ2ZWRVc2VkUkFNKHJjb25tZW0pXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRzdGF0dXMgPSAn8J+UtE9mZmxpbmUnXHJcblx0XHR9XHJcblx0fSBjYXRjaCAoZXJyb3IpIHtcclxuXHRcdGNvbnNvbGUuZXJyb3IoYEVycm9yIGZldGNoaW5nIHNlcnZlciBzdGF0dXMgZm9yICR7ZGJTZXJ2ZXIubmFtZX06YCwgZXJyb3IpXHJcblx0XHR0aHJvdyBuZXcgRXJyb3IoYEZhaWxlZCB0byBmZXRjaCBzZXJ2ZXIgc3RhdHVzIGZvciAke2RiU2VydmVyLm5hbWV9LmApXHJcblx0fVxyXG5cclxuXHRjb25zdCBtY3NlcnZlciA9IHtcclxuXHRcdG5hbWU6IGRiU2VydmVyLm5hbWUsXHJcblx0XHR2YWx1ZTogZGJTZXJ2ZXIudmFsdWUsXHJcblx0XHRjb25uZWN0aW9uSXA6IGRiU2VydmVyLmNvbm5JcCxcclxuXHRcdGlwOiBkYlNlcnZlci5pcCxcclxuXHRcdHBvcnQ6IGRiU2VydmVyLnBvcnQsXHJcblx0XHRyY29uUG9ydDogZGJTZXJ2ZXIucmNvblBvcnQsXHJcblx0XHRyY29uUGFzc3dvcmQ6IGRiU2VydmVyLnJjb25QYXNzd29yZCxcclxuXHRcdG1heFBsYXllcnM6IG1heFBsYXllcnMsXHJcblx0XHRvbmxpbmVQbGF5ZXJzOiBvbmxpbmVQbGF5ZXJzLFxyXG5cdFx0c3RhdHVzOiBzdGF0dXMsXHJcblx0XHRzZXJ2ZXJTb2Z0d2FyZTogZGJTZXJ2ZXIuc2VydmVyU29mdHdhcmUsXHJcblx0XHRtZW1vcnk6IG1lbW9yeVVzYWdlLFxyXG5cdFx0dHBzOiB0cHMsXHJcblx0XHRzZXJ2ZXJWZXJzaW9uOiBkYlNlcnZlci5zZXJ2ZXJWZXJzaW9uXHJcblx0fVxyXG5cclxuXHRjb25zdCBlbWJlZCA9IG5ldyBFbWJlZEJ1aWxkZXIoKVxyXG5cdFx0LnNldFRpdGxlKGBfXyoqUGFuZWwgZm9yICR7bWNzZXJ2ZXIubmFtZX0qKl9fYClcclxuXHRcdC5zZXREZXNjcmlwdGlvbihgSGVyZSB5b3UgY2FuIHNlZSBpbmZvcm1hdGlvbiBhYm91dCB0aGUgc2VydmVyLmApXHJcblx0XHQuYWRkRmllbGRzKHsgbmFtZTogJyoqU2VydmVyIFNvZnR3YXJlOioqJywgdmFsdWU6IGAke21jc2VydmVyLnNlcnZlclNvZnR3YXJlfWAgfSlcclxuXHRcdC5hZGRGaWVsZHMoeyBuYW1lOiAnKipTZXJ2ZXIgVmVyc2lvbjoqKicsIHZhbHVlOiBgJHttY3NlcnZlci5zZXJ2ZXJWZXJzaW9ufWAgfSlcclxuXHRcdC5hZGRGaWVsZHMoeyBuYW1lOiAnKipJUDoqKicsIHZhbHVlOiBgJHtcImBgYFwifSR7bWNzZXJ2ZXIuY29ubmVjdGlvbklwfSR7XCJgYGBcIn1gIH0pXHJcblx0XHQuYWRkRmllbGRzKHsgbmFtZTogJyoqUGxheWVyczoqKicsIHZhbHVlOiBgJHttY3NlcnZlci5vbmxpbmVQbGF5ZXJzfS8ke21jc2VydmVyLm1heFBsYXllcnN9YCB9KVxyXG5cdFx0LmFkZEZpZWxkcyh7IG5hbWU6ICcqKlN0YXR1czoqKicsIHZhbHVlOiBgJHttY3NlcnZlci5zdGF0dXN9YCB9KVxyXG5cdFx0LmFkZEZpZWxkcyh7IG5hbWU6ICcqKk1lbW9yeToqKicsIHZhbHVlOiBgJHttY3NlcnZlci5tZW1vcnl9YCB9KVxyXG5cdFx0LmFkZEZpZWxkcyh7IG5hbWU6ICcqKlRQUzoqKicsIHZhbHVlOiBgJHttY3NlcnZlci50cHN9YCB9KVxyXG5cdFx0LnNldENvbG9yKCdHcmVlbicpXHJcblx0XHQuc2V0VGltZXN0YW1wKClcclxuXHJcblx0cmV0dXJuIGVtYmVkXHJcbn1cclxuIl0sIm5hbWVzIjpbIkVtYmVkQnVpbGRlciIsImRiIiwiYXhpb3MiLCJnZXRSY29uQ2xpZW50Iiwic2VydmVyRW1iZWQiLCJ2YWx1ZSIsIkVycm9yIiwiZ2V0VFBTIiwic3RyIiwibWF0Y2giLCJleHRyYWN0UmVzZXJ2ZWRVc2VkUkFNIiwidGV4dCIsImxpbmUiLCJzcGxpdCIsInBocmFzZSIsInN0YXJ0SW5kZXgiLCJpbmRleE9mIiwic3RhcnRPZlJlc3VsdCIsImxlbmd0aCIsImVuZE9mTGluZUluZGV4Iiwic3Vic3RyaW5nIiwidHJpbSIsImRiU2VydmVyIiwic2VydmVyIiwiZmluZEZpcnN0Iiwid2hlcmUiLCJzdGF0dXMiLCJvbmxpbmVQbGF5ZXJzIiwibWF4UGxheWVycyIsInNlcnZlclNvZnR3YXJlIiwibWVtb3J5VXNhZ2UiLCJ0cHMiLCJyZXMiLCJnZXQiLCJpcCIsInBvcnQiLCJkYXRhIiwib25saW5lIiwicGxheWVycyIsIm1heCIsInNvZnR3YXJlIiwicmNvbiIsInJjb250cHMiLCJzZW5kIiwicmNvbm1lbSIsImVycm9yIiwiY29uc29sZSIsIm5hbWUiLCJtY3NlcnZlciIsImNvbm5lY3Rpb25JcCIsImNvbm5JcCIsInJjb25Qb3J0IiwicmNvblBhc3N3b3JkIiwibWVtb3J5Iiwic2VydmVyVmVyc2lvbiIsImVtYmVkIiwic2V0VGl0bGUiLCJzZXREZXNjcmlwdGlvbiIsImFkZEZpZWxkcyIsInNldENvbG9yIiwic2V0VGltZXN0YW1wIl0sIm1hcHBpbmdzIjoiQUFBQSxTQUFTQSxZQUFZLFFBQVEsYUFBWTtBQUN6QyxPQUFPQyxRQUFRLGVBQVc7QUFDMUIsT0FBT0MsV0FBVyxRQUFPO0FBQ3pCLFNBQVNDLGFBQWEsUUFBUSxpQkFBYTtBQUUzQyxPQUFPLGVBQWVDLFlBQVlDLEtBQWE7SUFDOUMsSUFBSSxDQUFDQSxPQUFPO1FBQ1gsTUFBTSxJQUFJQyxNQUFNO0lBQ2pCO0lBRUEsU0FBU0MsT0FBT0MsR0FBVztRQUMxQixNQUFNQyxRQUFRRCxJQUFJQyxLQUFLLENBQUM7UUFDeEIsT0FBT0EsUUFBUUEsS0FBSyxDQUFDLEVBQUUsR0FBRztJQUMzQjtJQUVBLFNBQVNDLHVCQUF1QkMsSUFBWTtRQUMzQyxNQUFNQyxPQUFPRCxLQUFLRSxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyx5QkFBeUI7O1FBQzFELE1BQU1DLFNBQVM7UUFDZixNQUFNQyxhQUFhSCxLQUFLSSxPQUFPLENBQUNGO1FBRWhDLHVFQUF1RTtRQUN2RSxJQUFJQyxlQUFlLENBQUMsR0FBRztZQUN0QixPQUFPO1FBQ1I7UUFFQSx3REFBd0Q7UUFDeEQs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