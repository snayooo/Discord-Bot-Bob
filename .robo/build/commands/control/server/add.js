import { createCommandConfig } from "robo.js";
import db from "../../../utils/DBUtils.js";
export const config = createCommandConfig({
    description: 'Add a new sound to the server.',
    options: [
        {
            name: 'servername',
            description: 'The name of the minecraft server.',
            type: 'string',
            required: true
        },
        {
            name: 'embed-value',
            description: 'The value to embed in the message.',
            type: 'string',
            required: true
        },
        {
            name: 'connection-ip',
            description: 'The connection IP of the minecraft server.',
            type: 'string',
            required: true
        },
        {
            name: 'ip',
            description: 'The IP address of the minecraft server.',
            type: 'string',
            required: true
        },
        {
            name: 'port',
            description: 'The port of the minecraft server.',
            type: 'integer',
            required: true
        },
        {
            name: 'rcon-port',
            description: 'The RCON port of the minecraft server.',
            type: 'integer',
            required: true
        },
        {
            name: 'rcon-password',
            description: 'The RCON password of the minecraft server.',
            type: 'string',
            required: true
        },
        {
            name: 'ssh-user',
            description: 'The SSH user for the server.',
            type: 'string',
            required: true
        },
        {
            name: 'ssh-password',
            description: 'The SSH password for the server.',
            type: 'string',
            required: true
        }
    ]
});
export default (async (interaction)=>{
    const serverName = interaction.options.getString('servername');
    const embedValue = interaction.options.getString('embed-value');
    const connectionIP = interaction.options.getString('connection-ip');
    const ip = interaction.options.getString('ip');
    const port = interaction.options.getInteger('port');
    const rconPort = interaction.options.getInteger('rcon-port');
    const rconPassword = interaction.options.getString('rcon-password');
    const sshUser = interaction.options.getString('ssh-user');
    const sshPassword = interaction.options.getString('ssh-password');
    if (!serverName || !embedValue || !connectionIP || !ip || !port || !rconPort || !rconPassword || !sshUser || !sshPassword) {
        await interaction.reply({
            content: 'Please provide all required fields.',
            ephemeral: true
        });
        return;
    }
    const dbServer = await db.server.findUnique({
        where: {
            name: serverName
        }
    });
    if (dbServer) {
        await interaction.reply({
            content: 'Server already exists.',
            ephemeral: true
        });
        return;
    }
    await db.server.create({
        data: {
            name: serverName,
            value: embedValue,
            connIp: connectionIP,
            ip: ip,
            port: port,
            rconPort: rconPort,
            rconPassword: rconPassword,
            sshUser: sshUser,
            sshPassword: sshPassword
        }
    });
    await interaction.reply({
        content: `Server added successfully! **${serverName}** is now configured. **IP:** ${ip}, **Port:** ${port}, **RCON Port:** ${rconPort}, **SSH User:** ${sshUser}`,
        ephemeral: true
    });
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6XFxEZXZlbG9wZW1lbnRcXERpc2NvcmQgQm90c1xcSmF2YVNjcmlwdFxcQm9iXFxzcmNcXGNvbW1hbmRzXFxjb250cm9sXFxzZXJ2ZXJcXGFkZC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGF0SW5wdXRDb21tYW5kSW50ZXJhY3Rpb24gfSBmcm9tIFwiZGlzY29yZC5qc1wiO1xyXG5pbXBvcnQgeyBjcmVhdGVDb21tYW5kQ29uZmlnIH0gZnJvbSBcInJvYm8uanNcIjtcclxuaW1wb3J0IGRiIGZyb20gXCIuLi8uLi8uLi91dGlscy9EQlV0aWxzXCI7XHJcblxyXG5leHBvcnQgY29uc3QgY29uZmlnID0gY3JlYXRlQ29tbWFuZENvbmZpZyh7XHJcbiAgICBkZXNjcmlwdGlvbjogJ0FkZCBhIG5ldyBzb3VuZCB0byB0aGUgc2VydmVyLicsXHJcbiAgICBvcHRpb25zOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiAnc2VydmVybmFtZScsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnVGhlIG5hbWUgb2YgdGhlIG1pbmVjcmFmdCBzZXJ2ZXIuJyxcclxuICAgICAgICAgICAgdHlwZTogJ3N0cmluZycsXHJcbiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiAnZW1iZWQtdmFsdWUnLFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1RoZSB2YWx1ZSB0byBlbWJlZCBpbiB0aGUgbWVzc2FnZS4nLFxyXG4gICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcclxuICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6ICdjb25uZWN0aW9uLWlwJyxcclxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdUaGUgY29ubmVjdGlvbiBJUCBvZiB0aGUgbWluZWNyYWZ0IHNlcnZlci4nLFxyXG4gICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcclxuICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6ICdpcCcsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnVGhlIElQIGFkZHJlc3Mgb2YgdGhlIG1pbmVjcmFmdCBzZXJ2ZXIuJyxcclxuICAgICAgICAgICAgdHlwZTogJ3N0cmluZycsXHJcbiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiAncG9ydCcsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnVGhlIHBvcnQgb2YgdGhlIG1pbmVjcmFmdCBzZXJ2ZXIuJyxcclxuICAgICAgICAgICAgdHlwZTogJ2ludGVnZXInLFxyXG4gICAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogJ3Jjb24tcG9ydCcsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnVGhlIFJDT04gcG9ydCBvZiB0aGUgbWluZWNyYWZ0IHNlcnZlci4nLFxyXG4gICAgICAgICAgICB0eXBlOiAnaW50ZWdlcicsXHJcbiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiAncmNvbi1wYXNzd29yZCcsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnVGhlIFJDT04gcGFzc3dvcmQgb2YgdGhlIG1pbmVjcmFmdCBzZXJ2ZXIuJyxcclxuICAgICAgICAgICAgdHlwZTogJ3N0cmluZycsXHJcbiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiAnc3NoLXVzZXInLFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1RoZSBTU0ggdXNlciBmb3IgdGhlIHNlcnZlci4nLFxyXG4gICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcclxuICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6ICdzc2gtcGFzc3dvcmQnLFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1RoZSBTU0ggcGFzc3dvcmQgZm9yIHRoZSBzZXJ2ZXIuJyxcclxuICAgICAgICAgICAgdHlwZTogJ3N0cmluZycsXHJcbiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICAgIH1cclxuICAgIF1cclxufSBhcyBjb25zdClcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChpbnRlcmFjdGlvbjogQ2hhdElucHV0Q29tbWFuZEludGVyYWN0aW9uKSA9PiB7XHJcbiAgICBjb25zdCBzZXJ2ZXJOYW1lID0gaW50ZXJhY3Rpb24ub3B0aW9ucy5nZXRTdHJpbmcoJ3NlcnZlcm5hbWUnKTtcclxuICAgIGNvbnN0IGVtYmVkVmFsdWUgPSBpbnRlcmFjdGlvbi5vcHRpb25zLmdldFN0cmluZygnZW1iZWQtdmFsdWUnKTtcclxuICAgIGNvbnN0IGNvbm5lY3Rpb25JUCA9IGludGVyYWN0aW9uLm9wdGlvbnMuZ2V0U3RyaW5nKCdjb25uZWN0aW9uLWlwJyk7XHJcbiAgICBjb25zdCBpcCA9IGludGVyYWN0aW9uLm9wdGlvbnMuZ2V0U3RyaW5nKCdpcCcpO1xyXG4gICAgY29uc3QgcG9ydCA9IGludGVyYWN0aW9uLm9wdGlvbnMuZ2V0SW50ZWdlcigncG9ydCcpO1xyXG4gICAgY29uc3QgcmNvblBvcnQgPSBpbnRlcmFjdGlvbi5vcHRpb25zLmdldEludGVnZXIoJ3Jjb24tcG9ydCcpO1xyXG4gICAgY29uc3QgcmNvblBhc3N3b3JkID0gaW50ZXJhY3Rpb24ub3B0aW9ucy5nZXRTdHJpbmcoJ3Jjb24tcGFzc3dvcmQnKTtcclxuICAgIGNvbnN0IHNzaFVzZXIgPSBpbnRlcmFjdGlvbi5vcHRpb25zLmdldFN0cmluZygnc3NoLXVzZXInKTtcclxuICAgIGNvbnN0IHNzaFBhc3N3b3JkID0gaW50ZXJhY3Rpb24ub3B0aW9ucy5nZXRTdHJpbmcoJ3NzaC1wYXNzd29yZCcpO1xyXG5cclxuICAgIGlmICghc2VydmVyTmFtZSB8fCAhZW1iZWRWYWx1ZSB8fCAhY29ubmVjdGlvbklQIHx8ICFpcCB8fCAhcG9ydCB8fCAhcmNvblBvcnQgfHwgIXJjb25QYXNzd29yZCB8fCAhc3NoVXNlciB8fCAhc3NoUGFzc3dvcmQpIHtcclxuICAgICAgICBhd2FpdCBpbnRlcmFjdGlvbi5yZXBseSh7IGNvbnRlbnQ6ICdQbGVhc2UgcHJvdmlkZSBhbGwgcmVxdWlyZWQgZmllbGRzLicsIGVwaGVtZXJhbDogdHJ1ZSB9KTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZGJTZXJ2ZXIgPSBhd2FpdCBkYi5zZXJ2ZXIuZmluZFVuaXF1ZSh7IHdoZXJlOiB7IG5hbWU6IHNlcnZlck5hbWUgfSB9KTtcclxuXHJcbiAgICBpZiAoZGJTZXJ2ZXIpIHtcclxuICAgICAgICBhd2FpdCBpbnRlcmFjdGlvbi5yZXBseSh7IGNvbnRlbnQ6ICdTZXJ2ZXIgYWxyZWFkeSBleGlzdHMuJywgZXBoZW1lcmFsOiB0cnVlIH0pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBhd2FpdCBkYi5zZXJ2ZXIuY3JlYXRlKHtcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIG5hbWU6IHNlcnZlck5hbWUsXHJcbiAgICAgICAgICAgIHZhbHVlOiBlbWJlZFZhbHVlLFxyXG4gICAgICAgICAgICBjb25uSXA6IGNvbm5lY3Rpb25JUCxcclxuICAgICAgICAgICAgaXA6IGlwLFxyXG4gICAgICAgICAgICBwb3J0OiBwb3J0LFxyXG4gICAgICAgICAgICByY29uUG9ydDogcmNvblBvcnQsXHJcbiAgICAgICAgICAgIHJjb25QYXNzd29yZDogcmNvblBhc3N3b3JkLFxyXG4gICAgICAgICAgICBzc2hVc2VyOiBzc2hVc2VyLFxyXG4gICAgICAgICAgICBzc2hQYXNzd29yZDogc3NoUGFzc3dvcmRcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBhd2FpdCBpbnRlcmFjdGlvbi5yZXBseSh7IGNvbnRlbnQ6IGBTZXJ2ZXIgYWRkZWQgc3VjY2Vzc2Z1bGx5ISAqKiR7c2VydmVyTmFtZX0qKiBpcyBub3cgY29uZmlndXJlZC4gKipJUDoqKiAke2lwfSwgKipQb3J0OioqICR7cG9ydH0sICoqUkNPTiBQb3J0OioqICR7cmNvblBvcnR9LCAqKlNTSCBVc2VyOioqICR7c3NoVXNlcn1gLCBlcGhlbWVyYWw6IHRydWUgfSk7XHJcbn0iXSwibmFtZXMiOlsiY3JlYXRlQ29tbWFuZENvbmZpZyIsImRiIiwiY29uZmlnIiwiZGVzY3JpcHRpb24iLCJvcHRpb25zIiwibmFtZSIsInR5cGUiLCJyZXF1aXJlZCIsImludGVyYWN0aW9uIiwic2VydmVyTmFtZSIsImdldFN0cmluZyIsImVtYmVkVmFsdWUiLCJjb25uZWN0aW9uSVAiLCJpcCIsInBvcnQiLCJnZXRJbnRlZ2VyIiwicmNvblBvcnQiLCJyY29uUGFzc3dvcmQiLCJzc2hVc2VyIiwic3NoUGFzc3dvcmQiLCJyZXBseSIsImNvbnRlbnQiLCJlcGhlbWVyYWwiLCJkYlNlcnZlciIsInNlcnZlciIsImZpbmRVbmlxdWUiLCJ3aGVyZSIsImNyZWF0ZSIsImRhdGEiLCJ2YWx1ZSIsImNvbm5JcCJdLCJtYXBwaW5ncyI6IkFBQ0EsU0FBU0EsbUJBQW1CLFFBQVEsVUFBVTtBQUM5QyxPQUFPQyxRQUFRLDRCQUF5QjtBQUV4QyxPQUFPLE1BQU1DLFNBQVNGLG9CQUFvQjtJQUN0Q0csYUFBYTtJQUNiQyxTQUFTO1FBQ0w7WUFDSUMsTUFBTTtZQUNORixhQUFhO1lBQ2JHLE1BQU07WUFDTkMsVUFBVTtRQUNkO1FBQ0E7WUFDSUYsTUFBTTtZQUNO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