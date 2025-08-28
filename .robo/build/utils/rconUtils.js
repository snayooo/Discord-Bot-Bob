import { Rcon } from "rcon-client";
import db from "./DBUtils.js";
const rconClients = new Map();
export async function connectAllServers() {
    const servers = await db.server.findMany();
    for (const server of servers){
        await connectToServer(server.value, server.ip, server.rconPort, server.rconPassword);
    }
}
export async function connectToServer(value, host, port, password) {
    // If already connected, check if it's still alive
    const existing = rconClients.get(value);
    if (existing) {
        try {
            await existing.send("list"); // simple ping test
            console.log(`♻️ Reusing existing RCON connection for server ${value}`);
            return existing;
        } catch  {
            console.warn(`⚠️ Existing RCON connection for server ${value} is dead, reconnecting...`);
            existing.end(); // clean up dead connection
            rconClients.delete(value);
        }
    }
    // Create a new connection
    try {
        const rcon = await Rcon.connect({
            host,
            port,
            password
        });
        console.log(`✅ Connected to server ${value} (${host}:${port})`);
        rconClients.set(value, rcon);
        // Optional: auto-remove if connection closes
        rcon.on("end", ()=>{
            console.warn(`🔌 RCON connection to server ${value} closed`);
            rconClients.delete(value);
        });
        return rcon;
    } catch (err) {
        console.error(`❌ Failed to connect to server ${value}:`, err);
        return undefined;
    }
}
export function getRconClient(value) {
    return rconClients.get(value);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6XFxEZXZlbG9wZW1lbnRcXERpc2NvcmQgQm90c1xcSmF2YVNjcmlwdFxcQm9iXFxzcmNcXHV0aWxzXFxyY29uVXRpbHMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmNvbiB9IGZyb20gJ3Jjb24tY2xpZW50J1xyXG5pbXBvcnQgZGIgZnJvbSAnLi9EQlV0aWxzJ1xyXG5cclxuY29uc3QgcmNvbkNsaWVudHM6IE1hcDxzdHJpbmcsIFJjb24+ID0gbmV3IE1hcCgpO1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNvbm5lY3RBbGxTZXJ2ZXJzKCkge1xyXG4gIGNvbnN0IHNlcnZlcnMgPSBhd2FpdCBkYi5zZXJ2ZXIuZmluZE1hbnkoKTtcclxuXHJcbiAgZm9yIChjb25zdCBzZXJ2ZXIgb2Ygc2VydmVycykge1xyXG4gICAgYXdhaXQgY29ubmVjdFRvU2VydmVyKHNlcnZlci52YWx1ZSwgc2VydmVyLmlwLCBzZXJ2ZXIucmNvblBvcnQsIHNlcnZlci5yY29uUGFzc3dvcmQpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNvbm5lY3RUb1NlcnZlcih2YWx1ZTogc3RyaW5nLCBob3N0OiBzdHJpbmcsIHBvcnQ6IG51bWJlciwgcGFzc3dvcmQ6IHN0cmluZykge1xyXG4gIC8vIElmIGFscmVhZHkgY29ubmVjdGVkLCBjaGVjayBpZiBpdCdzIHN0aWxsIGFsaXZlXHJcbiAgY29uc3QgZXhpc3RpbmcgPSByY29uQ2xpZW50cy5nZXQodmFsdWUpO1xyXG4gIGlmIChleGlzdGluZykge1xyXG4gICAgdHJ5IHtcclxuICAgICAgYXdhaXQgZXhpc3Rpbmcuc2VuZChcImxpc3RcIik7IC8vIHNpbXBsZSBwaW5nIHRlc3RcclxuICAgICAgY29uc29sZS5sb2coYOKZu++4jyBSZXVzaW5nIGV4aXN0aW5nIFJDT04gY29ubmVjdGlvbiBmb3Igc2VydmVyICR7dmFsdWV9YCk7XHJcbiAgICAgIHJldHVybiBleGlzdGluZztcclxuICAgIH0gY2F0Y2gge1xyXG4gICAgICBjb25zb2xlLndhcm4oYOKaoO+4jyBFeGlzdGluZyBSQ09OIGNvbm5lY3Rpb24gZm9yIHNlcnZlciAke3ZhbHVlfSBpcyBkZWFkLCByZWNvbm5lY3RpbmcuLi5gKTtcclxuICAgICAgZXhpc3RpbmcuZW5kKCk7IC8vIGNsZWFuIHVwIGRlYWQgY29ubmVjdGlvblxyXG4gICAgICByY29uQ2xpZW50cy5kZWxldGUodmFsdWUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gQ3JlYXRlIGEgbmV3IGNvbm5lY3Rpb25cclxuICB0cnkge1xyXG4gICAgY29uc3QgcmNvbiA9IGF3YWl0IFJjb24uY29ubmVjdCh7IGhvc3QsIHBvcnQsIHBhc3N3b3JkIH0pO1xyXG4gICAgY29uc29sZS5sb2coYOKchSBDb25uZWN0ZWQgdG8gc2VydmVyICR7dmFsdWV9ICgke2hvc3R9OiR7cG9ydH0pYCk7XHJcbiAgICByY29uQ2xpZW50cy5zZXQodmFsdWUsIHJjb24pO1xyXG5cclxuICAgIC8vIE9wdGlvbmFsOiBhdXRvLXJlbW92ZSBpZiBjb25uZWN0aW9uIGNsb3Nlc1xyXG4gICAgcmNvbi5vbihcImVuZFwiLCAoKSA9PiB7XHJcbiAgICAgIGNvbnNvbGUud2Fybihg8J+UjCBSQ09OIGNvbm5lY3Rpb24gdG8gc2VydmVyICR7dmFsdWV9IGNsb3NlZGApO1xyXG4gICAgICByY29uQ2xpZW50cy5kZWxldGUodmFsdWUpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHJjb247XHJcbiAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKGDinYwgRmFpbGVkIHRvIGNvbm5lY3QgdG8gc2VydmVyICR7dmFsdWV9OmAsIGVycik7XHJcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFJjb25DbGllbnQodmFsdWU6IHN0cmluZyk6IFJjb24gfCB1bmRlZmluZWQge1xyXG4gIHJldHVybiByY29uQ2xpZW50cy5nZXQodmFsdWUpO1xyXG59Il0sIm5hbWVzIjpbIlJjb24iLCJkYiIsInJjb25DbGllbnRzIiwiTWFwIiwiY29ubmVjdEFsbFNlcnZlcnMiLCJzZXJ2ZXJzIiwic2VydmVyIiwiZmluZE1hbnkiLCJjb25uZWN0VG9TZXJ2ZXIiLCJ2YWx1ZSIsImlwIiwicmNvblBvcnQiLCJyY29uUGFzc3dvcmQiLCJob3N0IiwicG9ydCIsInBhc3N3b3JkIiwiZXhpc3RpbmciLCJnZXQiLCJzZW5kIiwiY29uc29sZSIsImxvZyIsIndhcm4iLCJlbmQiLCJkZWxldGUiLCJyY29uIiwiY29ubmVjdCIsInNldCIsIm9uIiwiZXJyIiwiZXJyb3IiLCJ1bmRlZmluZWQiLCJnZXRSY29uQ2xpZW50Il0sIm1hcHBpbmdzIjoiQUFBQSxTQUFTQSxJQUFJLFFBQVEsY0FBYTtBQUNsQyxPQUFPQyxRQUFRLGVBQVc7QUFFMUIsTUFBTUMsY0FBaUMsSUFBSUM7QUFFM0MsT0FBTyxlQUFlQztJQUNwQixNQUFNQyxVQUFVLE1BQU1KLEdBQUdLLE1BQU0sQ0FBQ0MsUUFBUTtJQUV4QyxLQUFLLE1BQU1ELFVBQVVELFFBQVM7UUFDNUIsTUFBTUcsZ0JBQWdCRixPQUFPRyxLQUFLLEVBQUVILE9BQU9JLEVBQUUsRUFBRUosT0FBT0ssUUFBUSxFQUFFTCxPQUFPTSxZQUFZO0lBQ3JGO0FBQ0Y7QUFFQSxPQUFPLGVBQWVKLGdCQUFnQkMsS0FBYSxFQUFFSSxJQUFZLEVBQUVDLElBQVksRUFBRUMsUUFBZ0I7SUFDL0Ysa0RBQWtEO0lBQ2xELE1BQU1DLFdBQVdkLFlBQVllLEdBQUcsQ0FBQ1I7SUFDakMsSUFBSU8sVUFBVTtRQUNaLElBQUk7WUFDRixNQUFNQSxTQUFTRSxJQUFJLENBQUMsU0FBUyxtQkFBbUI7WUFDaERDLFFBQVFDLEdBQUcsQ0FBQyxDQUFDLCtDQUErQyxFQUFFWCxPQUFPO1lBQ3JFLE9BQU9PO1FBQ1QsRUFBRSxPQUFNO1lBQ05HLFFBQVFFLElBQUksQ0FBQyxDQUFDLHVDQUF1QyxFQUFFWixNQUFNLHlCQUF5QixDQUFDO1lBQ3ZGTyxTQUFTTSxHQUFHLElBQUksMkJBQTJCO1lBQzNDcEIsWUFBWXFCLE1BQU0sQ0FBQ2Q7UUFDckI7SUFDRjtJQUVBLDBCQUEwQjtJQUMxQixJQUFJO1FBQ0YsTUFBTWUsT0FBTyxNQUFNeEIsS0FBS3lCLE9BQU8sQ0FBQztZQUFFWjtZQUFNQztZQUFNQztRQUFTO1FBQ3ZESSxRQUFRQyxHQUFHLENBQUMsQ0FBQyxzQkFBc0IsRUFBRVgsTUFBTSxFQUFFLEVBQUVJLEtBQUssQ0FBQyxFQUFFQyxLQUFLLENBQUMsQ0FBQztRQUM5RFosWUFBWXdCLEdBQUcsQ0FBQ2pCLE9BQU9lO1FBRXZCLDZDQUE2QztRQUM3Q0EsS0FBS0csRUFBRSxDQUFDLE9BQU87WUFDYlIsUUFBUUUsSUFBSSxDQUFDLENBQUMsNkJBQTZCLEVBQUVaLE1BQU0sT0FBTyxDQUFDO1lBQzNEUCxZQUFZcUIsTUFBTSxDQUFDZDtRQUNyQjtRQUVBLE9BQU9lO0lBQ1QsRUFBRSxPQUFPSSxLQUFLO1FBQ1pULFFBQVFVLEtBQUssQ0FBQyxDQUFDLDhCQUE4QixFQUFFcEIsTUFBTSxDQUFDLENBQUMsRUFBRW1CO1FBQ3pELE9BQU9FO0lBQ1Q7QUFDRjtBQUVBLE9BQU8sU0FBU0MsY0FBY3RCLEtBQWE7SUFDekMsT0FBT1AsWUFBWWUsR0FBRyxDQUFDUjtBQUN6QiJ9