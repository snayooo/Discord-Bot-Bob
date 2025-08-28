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
            name: 'server-version',
            description: 'The version of the minecraft server.',
            type: 'string',
            required: true
        },
        {
            name: 'server-software',
            description: 'The software of the minecraft server.',
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
    const serverVersion = interaction.options.getString('server-version');
    const serverSoftware = interaction.options.getString('server-software') || 'Unknown';
    if (!serverName || !embedValue || !connectionIP || !ip || !port || !rconPort || !rconPassword || !serverVersion || !serverSoftware) {
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
            serverVersion: serverVersion,
            serverSoftware: serverSoftware
        }
    });
    await interaction.reply({
        content: `Server added successfully! **${serverName}** is now configured. **IP:** ${ip}, **Port:** ${port}, **RCON Port:** ${rconPort}`,
        ephemeral: true
    });
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6XFxEZXZlbG9wZW1lbnRcXERpc2NvcmQgQm90c1xcSmF2YVNjcmlwdFxcQm9iXFxzcmNcXGNvbW1hbmRzXFxjb250cm9sXFxzZXJ2ZXJcXGFkZC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGF0SW5wdXRDb21tYW5kSW50ZXJhY3Rpb24gfSBmcm9tICdkaXNjb3JkLmpzJ1xyXG5pbXBvcnQgeyBjcmVhdGVDb21tYW5kQ29uZmlnIH0gZnJvbSAncm9iby5qcydcclxuaW1wb3J0IGRiIGZyb20gJy4uLy4uLy4uL3V0aWxzL0RCVXRpbHMnXHJcblxyXG5leHBvcnQgY29uc3QgY29uZmlnID0gY3JlYXRlQ29tbWFuZENvbmZpZyh7XHJcblx0ZGVzY3JpcHRpb246ICdBZGQgYSBuZXcgc291bmQgdG8gdGhlIHNlcnZlci4nLFxyXG5cdG9wdGlvbnM6IFtcclxuXHRcdHtcclxuXHRcdFx0bmFtZTogJ3NlcnZlcm5hbWUnLFxyXG5cdFx0XHRkZXNjcmlwdGlvbjogJ1RoZSBuYW1lIG9mIHRoZSBtaW5lY3JhZnQgc2VydmVyLicsXHJcblx0XHRcdHR5cGU6ICdzdHJpbmcnLFxyXG5cdFx0XHRyZXF1aXJlZDogdHJ1ZVxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFx0bmFtZTogJ2VtYmVkLXZhbHVlJyxcclxuXHRcdFx0ZGVzY3JpcHRpb246ICdUaGUgdmFsdWUgdG8gZW1iZWQgaW4gdGhlIG1lc3NhZ2UuJyxcclxuXHRcdFx0dHlwZTogJ3N0cmluZycsXHJcblx0XHRcdHJlcXVpcmVkOiB0cnVlXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XHRuYW1lOiAnY29ubmVjdGlvbi1pcCcsXHJcblx0XHRcdGRlc2NyaXB0aW9uOiAnVGhlIGNvbm5lY3Rpb24gSVAgb2YgdGhlIG1pbmVjcmFmdCBzZXJ2ZXIuJyxcclxuXHRcdFx0dHlwZTogJ3N0cmluZycsXHJcblx0XHRcdHJlcXVpcmVkOiB0cnVlXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XHRuYW1lOiAnaXAnLFxyXG5cdFx0XHRkZXNjcmlwdGlvbjogJ1RoZSBJUCBhZGRyZXNzIG9mIHRoZSBtaW5lY3JhZnQgc2VydmVyLicsXHJcblx0XHRcdHR5cGU6ICdzdHJpbmcnLFxyXG5cdFx0XHRyZXF1aXJlZDogdHJ1ZVxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFx0bmFtZTogJ3BvcnQnLFxyXG5cdFx0XHRkZXNjcmlwdGlvbjogJ1RoZSBwb3J0IG9mIHRoZSBtaW5lY3JhZnQgc2VydmVyLicsXHJcblx0XHRcdHR5cGU6ICdpbnRlZ2VyJyxcclxuXHRcdFx0cmVxdWlyZWQ6IHRydWVcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcdG5hbWU6ICdyY29uLXBvcnQnLFxyXG5cdFx0XHRkZXNjcmlwdGlvbjogJ1RoZSBSQ09OIHBvcnQgb2YgdGhlIG1pbmVjcmFmdCBzZXJ2ZXIuJyxcclxuXHRcdFx0dHlwZTogJ2ludGVnZXInLFxyXG5cdFx0XHRyZXF1aXJlZDogdHJ1ZVxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFx0bmFtZTogJ3Jjb24tcGFzc3dvcmQnLFxyXG5cdFx0XHRkZXNjcmlwdGlvbjogJ1RoZSBSQ09OIHBhc3N3b3JkIG9mIHRoZSBtaW5lY3JhZnQgc2VydmVyLicsXHJcblx0XHRcdHR5cGU6ICdzdHJpbmcnLFxyXG5cdFx0XHRyZXF1aXJlZDogdHJ1ZVxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFx0bmFtZTogJ3NlcnZlci12ZXJzaW9uJyxcclxuXHRcdFx0ZGVzY3JpcHRpb246ICdUaGUgdmVyc2lvbiBvZiB0aGUgbWluZWNyYWZ0IHNlcnZlci4nLFxyXG5cdFx0XHR0eXBlOiAnc3RyaW5nJyxcclxuXHRcdFx0cmVxdWlyZWQ6IHRydWVcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcdG5hbWU6ICdzZXJ2ZXItc29mdHdhcmUnLFxyXG5cdFx0XHRkZXNjcmlwdGlvbjogJ1RoZSBzb2Z0d2FyZSBvZiB0aGUgbWluZWNyYWZ0IHNlcnZlci4nLFxyXG5cdFx0XHR0eXBlOiAnc3RyaW5nJyxcclxuXHRcdFx0cmVxdWlyZWQ6IHRydWVcclxuXHRcdH1cclxuXHRdXHJcbn0gYXMgY29uc3QpXHJcblxyXG5leHBvcnQgZGVmYXVsdCBhc3luYyAoaW50ZXJhY3Rpb246IENoYXRJbnB1dENvbW1hbmRJbnRlcmFjdGlvbikgPT4ge1xyXG5cdGNvbnN0IHNlcnZlck5hbWUgPSBpbnRlcmFjdGlvbi5vcHRpb25zLmdldFN0cmluZygnc2VydmVybmFtZScpXHJcblx0Y29uc3QgZW1iZWRWYWx1ZSA9IGludGVyYWN0aW9uLm9wdGlvbnMuZ2V0U3RyaW5nKCdlbWJlZC12YWx1ZScpXHJcblx0Y29uc3QgY29ubmVjdGlvbklQID0gaW50ZXJhY3Rpb24ub3B0aW9ucy5nZXRTdHJpbmcoJ2Nvbm5lY3Rpb24taXAnKVxyXG5cdGNvbnN0IGlwID0gaW50ZXJhY3Rpb24ub3B0aW9ucy5nZXRTdHJpbmcoJ2lwJylcclxuXHRjb25zdCBwb3J0ID0gaW50ZXJhY3Rpb24ub3B0aW9ucy5nZXRJbnRlZ2VyKCdwb3J0JylcclxuXHRjb25zdCByY29uUG9ydCA9IGludGVyYWN0aW9uLm9wdGlvbnMuZ2V0SW50ZWdlcigncmNvbi1wb3J0JylcclxuXHRjb25zdCByY29uUGFzc3dvcmQgPSBpbnRlcmFjdGlvbi5vcHRpb25zLmdldFN0cmluZygncmNvbi1wYXNzd29yZCcpXHJcblx0Y29uc3Qgc2VydmVyVmVyc2lvbiA9IGludGVyYWN0aW9uLm9wdGlvbnMuZ2V0U3RyaW5nKCdzZXJ2ZXItdmVyc2lvbicpXHJcblx0Y29uc3Qgc2VydmVyU29mdHdhcmUgPSBpbnRlcmFjdGlvbi5vcHRpb25zLmdldFN0cmluZygnc2VydmVyLXNvZnR3YXJlJykgfHwgJ1Vua25vd24nXHJcblxyXG5cdGlmICghc2VydmVyTmFtZSB8fCAhZW1iZWRWYWx1ZSB8fCAhY29ubmVjdGlvbklQIHx8ICFpcCB8fCAhcG9ydCB8fCAhcmNvblBvcnQgfHwgIXJjb25QYXNzd29yZCB8fCAhc2VydmVyVmVyc2lvbiB8fCAhc2VydmVyU29mdHdhcmUpIHtcclxuXHRcdGF3YWl0IGludGVyYWN0aW9uLnJlcGx5KHsgY29udGVudDogJ1BsZWFzZSBwcm92aWRlIGFsbCByZXF1aXJlZCBmaWVsZHMuJywgZXBoZW1lcmFsOiB0cnVlIH0pXHJcblx0XHRyZXR1cm5cclxuXHR9XHJcblxyXG5cdGNvbnN0IGRiU2VydmVyID0gYXdhaXQgZGIuc2VydmVyLmZpbmRVbmlxdWUoeyB3aGVyZTogeyBuYW1lOiBzZXJ2ZXJOYW1lIH0gfSlcclxuXHJcblx0aWYgKGRiU2VydmVyKSB7XHJcblx0XHRhd2FpdCBpbnRlcmFjdGlvbi5yZXBseSh7IGNvbnRlbnQ6ICdTZXJ2ZXIgYWxyZWFkeSBleGlzdHMuJywgZXBoZW1lcmFsOiB0cnVlIH0pXHJcblx0XHRyZXR1cm5cclxuXHR9XHJcblxyXG5cdGF3YWl0IGRiLnNlcnZlci5jcmVhdGUoe1xyXG5cdFx0ZGF0YToge1xyXG5cdFx0XHRuYW1lOiBzZXJ2ZXJOYW1lLFxyXG5cdFx0XHR2YWx1ZTogZW1iZWRWYWx1ZSxcclxuXHRcdFx0Y29ubklwOiBjb25uZWN0aW9uSVAsXHJcblx0XHRcdGlwOiBpcCxcclxuXHRcdFx0cG9ydDogcG9ydCxcclxuXHRcdFx0cmNvblBvcnQ6IHJjb25Qb3J0LFxyXG5cdFx0XHRyY29uUGFzc3dvcmQ6IHJjb25QYXNzd29yZCxcclxuXHRcdFx0c2VydmVyVmVyc2lvbjogc2VydmVyVmVyc2lvbixcclxuXHRcdFx0c2VydmVyU29mdHdhcmU6IHNlcnZlclNvZnR3YXJlXHJcblx0XHR9XHJcblx0fSlcclxuXHJcblx0YXdhaXQgaW50ZXJhY3Rpb24ucmVwbHkoe1xyXG5cdFx0Y29udGVudDogYFNlcnZlciBhZGRlZCBzdWNjZXNzZnVsbHkhICoqJHtzZXJ2ZXJOYW1lfSoqIGlzIG5vdyBjb25maWd1cmVkLiAqKklQOioqICR7aXB9LCAqKlBvcnQ6KiogJHtwb3J0fSwgKipSQ09OIFBvcnQ6KiogJHtyY29uUG9ydH1gLFxyXG5cdFx0ZXBoZW1lcmFsOiB0cnVlXHJcblx0fSlcclxufVxyXG4iXSwibmFtZXMiOlsiY3JlYXRlQ29tbWFuZENvbmZpZyIsImRiIiwiY29uZmlnIiwiZGVzY3JpcHRpb24iLCJvcHRpb25zIiwibmFtZSIsInR5cGUiLCJyZXF1aXJlZCIsImludGVyYWN0aW9uIiwic2VydmVyTmFtZSIsImdldFN0cmluZyIsImVtYmVkVmFsdWUiLCJjb25uZWN0aW9uSVAiLCJpcCIsInBvcnQiLCJnZXRJbnRlZ2VyIiwicmNvblBvcnQiLCJyY29uUGFzc3dvcmQiLCJzZXJ2ZXJWZXJzaW9uIiwic2VydmVyU29mdHdhcmUiLCJyZXBseSIsImNvbnRlbnQiLCJlcGhlbWVyYWwiLCJkYlNlcnZlciIsInNlcnZlciIsImZpbmRVbmlxdWUiLCJ3aGVyZSIsImNyZWF0ZSIsImRhdGEiLCJ2YWx1ZSIsImNvbm5JcCJdLCJtYXBwaW5ncyI6IkFBQ0EsU0FBU0EsbUJBQW1CLFFBQVEsVUFBUztBQUM3QyxPQUFPQyxRQUFRLDRCQUF3QjtBQUV2QyxPQUFPLE1BQU1DLFNBQVNGLG9CQUFvQjtJQUN6Q0csYUFBYTtJQUNiQyxTQUFTO1FBQ1I7WUFDQ0MsTUFBTTtZQUNORixhQUFhO1lBQ2JHLE1BQU07WUFDTkMsVUFBVTtRQUNYO1FBQ0E7WUFDQ0YsTUFBTTtZQUNORixhQUFhO1lBQ2JHLE1BQU07WUFDTkMsVUFBVTtRQUNYO1FBQ0E7WUFDQ0YsTUFBTTtZQUNORixhQUFhO1lBQ2JHLE1BQU07WUFDTkMsVUFBVTtRQUNYO1FBQ0E7WUFDQ0YsTUFBTTtZQUNORixhQUFhO1lBQ2JHLE1BQU07WUFDTkMsVUFBVTtRQUNYO1FBQ0E7WUFDQ0YsTUFBTTtZQUNORixhQUFhO1lBQ2JHLE1BQU07WUFDTkMsVUFBVTtRQUNYO1FBQ0E7WUFDQ0YsTUFBTTtZQUNORixhQUFhO1lBQ2JHLE1BQU07WUFDTkMsVUFBVTtRQUNYO1FBQ0E7WUFDQ0YsTUFBTTtZQUNORixhQUFhO1lBQ2JHLE1BQU07WUFDTkMsVUFBVTtRQUNYO1FBQ0E7WUFDQ0YsTUFBTTtZQUNORixhQUFhO1lBQ2JHLE1BQU07WUFDTkMsVUFBVTtRQUNYO1FBQ0E7WUFDQ0YsTUFBTTtZQUNORixhQUFhO1lBQ2JHLE1BQU07WUFDTkMsVUFBVTtRQUNYO0tBQ0E7QUFDRixHQUFXO0FBRVgsZUFBZSxDQUFBLE9BQU9DO0lBQ3JCLE1BQU1DLGFBQWFELFlBQVlKLE9BQU8sQ0FBQ00sU0FBUyxDQUFDO0lBQ2pELE1BQU1DLGFBQWFILFlBQVlKLE9BQU8sQ0FBQ00sU0FBUyxDQUFDO0lBQ2pELE1BQU1FLGVBQWVKLFlBQVlKLE9BQU8sQ0FBQ00sU0FBUyxDQUFDO0lBQ25ELE1BQU1HLEtBQUtMLFlBQVlKLE9BQU8sQ0FBQ00sU0FBUyxDQUFDO0lBQ3pDLE1BQU1JLE9BQU9OLFlBQVlKLE9BQU8sQ0FBQ1csVUFBVSxDQUFDO0lBQzVDLE1BQU1DLFdBQVdSLFlBQVlKLE9BQU8sQ0FBQ1csVUFBVSxDQUFDO0lBQ2hELE1BQU1FLGVBQWVULFlBQVlKLE9BQU8sQ0FBQ00sU0FBUyxDQUFDO0lBQ25ELE1BQU1RLGdCQUFnQlYsWUFBWUosT0FBTyxDQUFDTSxTQUFTLENBQUM7SUFDcEQsTUFBTVMsaUJBQWlCWCxZQUFZSixPQUFPLENBQUNNLFNBQVMsQ0FBQyxzQkFBc0I7SUFFM0UsSUFBSSxDQUFDRCxjQUFjLENBQUNFLGNBQWMsQ0FBQ0MsZ0JBQWdCLENBQUNDLE1BQU0sQ0FBQ0MsUUFBUSxDQUFDRSxZQUFZLENBQUNDLGdCQUFnQixDQUFDQyxpQkFBaUIsQ0FBQ0MsZ0JBQWdCO1FBQ25JLE1BQU1YLFlBQVlZLEtBQUssQ0FBQztZQUFFQyxTQUFTO1lBQXVDQyxXQUFXO1FBQUs7UUFDMUY7SUFDRDtJQUVBLE1BQU1DLFdBQVcsTUFBTXRCLEdBQUd1QixNQUFNLENBQUNDLFVBQVUsQ0FBQztRQUFFQyxPQUFPO1lBQUVyQixNQUFNSTtRQUFXO0lBQUU7SUFFMUUsSUFBSWMsVUFBVTtRQUNiLE1BQU1mLFlBQVlZLEtBQUssQ0FBQztZQUFFQyxTQUFTO1lBQTBCQyxXQUFXO1FBQUs7UUFDN0U7SUFDRDtJQUVBLE1BQU1yQixHQUFHdUIsTUFBTSxDQUFDRyxNQUFNLENBQUM7UUFDdEJDLE1BQU07WUFDTHZCLE1BQU1JO1lBQ05vQixPQUFPbEI7WUFDUG1CLFFBQVFsQjtZQUNSQyxJQUFJQTtZQUNKQyxNQUFNQTtZQUNORSxVQUFVQTtZQUNWQyxjQUFjQTtZQUNkQyxlQUFlQTtZQUNmQyxnQkFBZ0JBO1FBQ2pCO0lBQ0Q7SUFFQSxNQUFNWCxZQUFZWSxLQUFLLENBQUM7UUFDdkJDLFNBQVMsQ0FBQyw2QkFBNkIsRUFBRVosV0FBVyw4QkFBOEIsRUFBRUksR0FBRyxZQUFZLEVBQUVDLEtBQUssaUJBQWlCLEVBQUVFLFVBQVU7UUFDdklNLFdBQVc7SUFDWjtBQUNELENBQUEsRUFBQyJ9