import { createCommandConfig } from "robo.js";
import { serverEmbed } from "../../../utils/mcUtils.js";
export const config = createCommandConfig({
    description: 'Sends a control panel embed for Minecraft servers.',
    options: [
        {
            name: 'server',
            description: 'The Minecraft server to control.',
            type: 'string',
            required: true,
            choices: [
                {
                    name: 'SMP',
                    value: 'smp'
                },
                {
                    name: 'Lele1337',
                    value: 'lele1337'
                }
            ]
        }
    ],
    defaultMemberPermissions: 8
});
export default (async (interaction)=>{
    await interaction.deferReply();
    const selectedServer = interaction.options.getString('server');
    if (!selectedServer) {
        return await interaction.editReply({
            content: 'Please select a server to control.'
        });
    }
    const embed = await serverEmbed(selectedServer);
    await interaction.editReply({
        embeds: [
            embed
        ]
    });
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6XFxEZXZlbG9wZW1lbnRcXERpc2NvcmQgQm90c1xcSmF2YVNjcmlwdFxcQm9iXFxzcmNcXGNvbW1hbmRzXFxjb250cm9sXFxwYW5lbFxcbWluZWNyYWZ0LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYXRJbnB1dENvbW1hbmRJbnRlcmFjdGlvbiB9IGZyb20gJ2Rpc2NvcmQuanMnXHJcbmltcG9ydCB7IGNyZWF0ZUNvbW1hbmRDb25maWcgfSBmcm9tICdyb2JvLmpzJ1xyXG5pbXBvcnQgeyBzZXJ2ZXJFbWJlZCB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL21jVXRpbHMnXHJcblxyXG5leHBvcnQgY29uc3QgY29uZmlnID0gY3JlYXRlQ29tbWFuZENvbmZpZyh7XHJcblx0ZGVzY3JpcHRpb246ICdTZW5kcyBhIGNvbnRyb2wgcGFuZWwgZW1iZWQgZm9yIE1pbmVjcmFmdCBzZXJ2ZXJzLicsXHJcblx0b3B0aW9uczogW1xyXG5cdFx0e1xyXG5cdFx0XHRuYW1lOiAnc2VydmVyJyxcclxuXHRcdFx0ZGVzY3JpcHRpb246ICdUaGUgTWluZWNyYWZ0IHNlcnZlciB0byBjb250cm9sLicsXHJcblx0XHRcdHR5cGU6ICdzdHJpbmcnLFxyXG5cdFx0XHRyZXF1aXJlZDogdHJ1ZSxcclxuXHRcdFx0Y2hvaWNlczogW1xyXG5cdFx0XHRcdHsgbmFtZTogJ1NNUCcsIHZhbHVlOiAnc21wJyB9LFxyXG5cdFx0XHRcdHsgbmFtZTogJ0xlbGUxMzM3JywgdmFsdWU6ICdsZWxlMTMzNycgfVxyXG5cdFx0XHRdXHJcblx0XHR9XHJcblx0XSxcclxuXHRkZWZhdWx0TWVtYmVyUGVybWlzc2lvbnM6IDhcclxufSBhcyBjb25zdClcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChpbnRlcmFjdGlvbjogQ2hhdElucHV0Q29tbWFuZEludGVyYWN0aW9uKSA9PiB7XHJcblx0YXdhaXQgaW50ZXJhY3Rpb24uZGVmZXJSZXBseSgpXHJcblxyXG5cdGNvbnN0IHNlbGVjdGVkU2VydmVyID0gaW50ZXJhY3Rpb24ub3B0aW9ucy5nZXRTdHJpbmcoJ3NlcnZlcicpXHJcblxyXG5cdGlmICghc2VsZWN0ZWRTZXJ2ZXIpIHtcclxuXHRcdHJldHVybiBhd2FpdCBpbnRlcmFjdGlvbi5lZGl0UmVwbHkoe1xyXG5cdFx0XHRjb250ZW50OiAnUGxlYXNlIHNlbGVjdCBhIHNlcnZlciB0byBjb250cm9sLidcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHRjb25zdCBlbWJlZCA9IGF3YWl0IHNlcnZlckVtYmVkKHNlbGVjdGVkU2VydmVyKVxyXG5cclxuXHRhd2FpdCBpbnRlcmFjdGlvbi5lZGl0UmVwbHkoeyBlbWJlZHM6IFtlbWJlZF0gfSlcclxufVxyXG4iXSwibmFtZXMiOlsiY3JlYXRlQ29tbWFuZENvbmZpZyIsInNlcnZlckVtYmVkIiwiY29uZmlnIiwiZGVzY3JpcHRpb24iLCJvcHRpb25zIiwibmFtZSIsInR5cGUiLCJyZXF1aXJlZCIsImNob2ljZXMiLCJ2YWx1ZSIsImRlZmF1bHRNZW1iZXJQZXJtaXNzaW9ucyIsImludGVyYWN0aW9uIiwiZGVmZXJSZXBseSIsInNlbGVjdGVkU2VydmVyIiwiZ2V0U3RyaW5nIiwiZWRpdFJlcGx5IiwiY29udGVudCIsImVtYmVkIiwiZW1iZWRzIl0sIm1hcHBpbmdzIjoiQUFDQSxTQUFTQSxtQkFBbUIsUUFBUSxVQUFTO0FBQzdDLFNBQVNDLFdBQVcsUUFBUSw0QkFBd0I7QUFFcEQsT0FBTyxNQUFNQyxTQUFTRixvQkFBb0I7SUFDekNHLGFBQWE7SUFDYkMsU0FBUztRQUNSO1lBQ0NDLE1BQU07WUFDTkYsYUFBYTtZQUNiRyxNQUFNO1lBQ05DLFVBQVU7WUFDVkMsU0FBUztnQkFDUjtvQkFBRUgsTUFBTTtvQkFBT0ksT0FBTztnQkFBTTtnQkFDNUI7b0JBQUVKLE1BQU07b0JBQVlJLE9BQU87Z0JBQVc7YUFDdEM7UUFDRjtLQUNBO0lBQ0RDLDBCQUEwQjtBQUMzQixHQUFXO0FBRVgsZUFBZSxDQUFBLE9BQU9DO0lBQ3JCLE1BQU1BLFlBQVlDLFVBQVU7SUFFNUIsTUFBTUMsaUJBQWlCRixZQUFZUCxPQUFPLENBQUNVLFNBQVMsQ0FBQztJQUVyRCxJQUFJLENBQUNELGdCQUFnQjtRQUNwQixPQUFPLE1BQU1GLFlBQVlJLFNBQVMsQ0FBQztZQUNsQ0MsU0FBUztRQUNWO0lBQ0Q7SUFFQSxNQUFNQyxRQUFRLE1BQU1oQixZQUFZWTtJQUVoQyxNQUFNRixZQUFZSSxTQUFTLENBQUM7UUFBRUcsUUFBUTtZQUFDRDtTQUFNO0lBQUM7QUFDL0MsQ0FBQSxFQUFDIn0=