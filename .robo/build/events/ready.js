import { ActivityType } from "discord.js";
import { client } from "robo.js";
import { serverEmbed } from "../utils/mcUtils.js";
export default (()=>{
    client.user?.setActivity({
        name: 'you',
        type: ActivityType.Watching
    });
    // Update the Minecraft server embeds every minute
    setInterval(async ()=>{
        const smpEmbed = await serverEmbed('smp');
        const leleEmbed = await serverEmbed('lele1337');
        const smpChannel = client.channels.cache.get('1401593913793577020');
        const leleChannel = client.channels.cache.get('1401593876191645796');
        if (!smpChannel) {
            console.error('SMP channel not found.');
            return false;
        }
        if (smpChannel.isTextBased()) {
            const msg = await smpChannel.messages.fetch('1401921188074361034');
            if (msg) {
                await msg.edit({
                    embeds: [
                        smpEmbed
                    ]
                });
            } else {
                if (smpChannel.isSendable()) {
                    await smpChannel.send({
                        embeds: [
                            smpEmbed
                        ]
                    });
                }
            }
        }
        if (!leleChannel) {
            console.error('Lele channel not found.');
            return false;
        }
        if (leleChannel.isTextBased()) {
            const msg = await leleChannel.messages.fetch('1401921459076464812');
            if (msg) {
                await msg.edit({
                    embeds: [
                        leleEmbed
                    ]
                });
            } else {
                if (leleChannel.isSendable()) {
                    await leleChannel.send({
                        embeds: [
                            leleEmbed
                        ]
                    });
                }
            }
        }
    }, 1000 * 60); // Update every minute
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6XFxEZXZlbG9wZW1lbnRcXERpc2NvcmQgQm90c1xcSmF2YVNjcmlwdFxcQm9iXFxzcmNcXGV2ZW50c1xccmVhZHkudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWN0aXZpdHlUeXBlIH0gZnJvbSAnZGlzY29yZC5qcydcbmltcG9ydCB7IGNsaWVudCB9IGZyb20gJ3JvYm8uanMnXG5pbXBvcnQgeyBzZXJ2ZXJFbWJlZCB9IGZyb20gJy4uL3V0aWxzL21jVXRpbHMnXG5cbmV4cG9ydCBkZWZhdWx0ICgpID0+IHtcblx0Y2xpZW50LnVzZXI/LnNldEFjdGl2aXR5KHtcblx0XHRuYW1lOiAneW91Jyxcblx0XHR0eXBlOiBBY3Rpdml0eVR5cGUuV2F0Y2hpbmdcblx0fSlcblxuXHQvLyBVcGRhdGUgdGhlIE1pbmVjcmFmdCBzZXJ2ZXIgZW1iZWRzIGV2ZXJ5IG1pbnV0ZVxuXHRzZXRJbnRlcnZhbChhc3luYyAoKSA9PiB7XG5cdFx0Y29uc3Qgc21wRW1iZWQgPSBhd2FpdCBzZXJ2ZXJFbWJlZCgnc21wJylcblx0XHRjb25zdCBsZWxlRW1iZWQgPSBhd2FpdCBzZXJ2ZXJFbWJlZCgnbGVsZTEzMzcnKVxuXG5cdFx0Y29uc3Qgc21wQ2hhbm5lbCA9IGNsaWVudC5jaGFubmVscy5jYWNoZS5nZXQoJzE0MDE1OTM5MTM3OTM1NzcwMjAnKVxuXHRcdGNvbnN0IGxlbGVDaGFubmVsID0gY2xpZW50LmNoYW5uZWxzLmNhY2hlLmdldCgnMTQwMTU5Mzg3NjE5MTY0NTc5NicpXG5cblx0XHRpZiAoIXNtcENoYW5uZWwpIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoJ1NNUCBjaGFubmVsIG5vdCBmb3VuZC4nKVxuXHRcdFx0cmV0dXJuIGZhbHNlXG5cdFx0fVxuXG5cdFx0aWYgKHNtcENoYW5uZWwuaXNUZXh0QmFzZWQoKSkge1xuXHRcdFx0Y29uc3QgbXNnID0gYXdhaXQgc21wQ2hhbm5lbC5tZXNzYWdlcy5mZXRjaCgnMTQwMTkyMTE4ODA3NDM2MTAzNCcpXG5cblx0XHRcdGlmIChtc2cpIHtcblx0XHRcdFx0YXdhaXQgbXNnLmVkaXQoeyBlbWJlZHM6IFtzbXBFbWJlZF0gfSlcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmIChzbXBDaGFubmVsLmlzU2VuZGFibGUoKSkge1xuXHRcdFx0XHRcdGF3YWl0IHNtcENoYW5uZWwuc2VuZCh7IGVtYmVkczogW3NtcEVtYmVkXSB9KVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKCFsZWxlQ2hhbm5lbCkge1xuXHRcdFx0Y29uc29sZS5lcnJvcignTGVsZSBjaGFubmVsIG5vdCBmb3VuZC4nKVxuXHRcdFx0cmV0dXJuIGZhbHNlXG5cdFx0fVxuXG5cdFx0aWYgKGxlbGVDaGFubmVsLmlzVGV4dEJhc2VkKCkpIHtcblx0XHRcdGNvbnN0IG1zZyA9IGF3YWl0IGxlbGVDaGFubmVsLm1lc3NhZ2VzLmZldGNoKCcxNDAxOTIxNDU5MDc2NDY0ODEyJylcblxuXHRcdFx0aWYgKG1zZykge1xuXHRcdFx0XHRhd2FpdCBtc2cuZWRpdCh7IGVtYmVkczogW2xlbGVFbWJlZF0gfSlcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmIChsZWxlQ2hhbm5lbC5pc1NlbmRhYmxlKCkpIHtcblx0XHRcdFx0XHRhd2FpdCBsZWxlQ2hhbm5lbC5zZW5kKHsgZW1iZWRzOiBbbGVsZUVtYmVkXSB9KVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9LCAxMDAwICogNjApIC8vIFVwZGF0ZSBldmVyeSBtaW51dGVcbn1cbiJdLCJuYW1lcyI6WyJBY3Rpdml0eVR5cGUiLCJjbGllbnQiLCJzZXJ2ZXJFbWJlZCIsInVzZXIiLCJzZXRBY3Rpdml0eSIsIm5hbWUiLCJ0eXBlIiwiV2F0Y2hpbmciLCJzZXRJbnRlcnZhbCIsInNtcEVtYmVkIiwibGVsZUVtYmVkIiwic21wQ2hhbm5lbCIsImNoYW5uZWxzIiwiY2FjaGUiLCJnZXQiLCJsZWxlQ2hhbm5lbCIsImNvbnNvbGUiLCJlcnJvciIsImlzVGV4dEJhc2VkIiwibXNnIiwibWVzc2FnZXMiLCJmZXRjaCIsImVkaXQiLCJlbWJlZHMiLCJpc1NlbmRhYmxlIiwic2VuZCJdLCJtYXBwaW5ncyI6IkFBQUEsU0FBU0EsWUFBWSxRQUFRLGFBQVk7QUFDekMsU0FBU0MsTUFBTSxRQUFRLFVBQVM7QUFDaEMsU0FBU0MsV0FBVyxRQUFRLHNCQUFrQjtBQUU5QyxlQUFlLENBQUE7SUFDZEQsT0FBT0UsSUFBSSxFQUFFQyxZQUFZO1FBQ3hCQyxNQUFNO1FBQ05DLE1BQU1OLGFBQWFPLFFBQVE7SUFDNUI7SUFFQSxrREFBa0Q7SUFDbERDLFlBQVk7UUFDWCxNQUFNQyxXQUFXLE1BQU1QLFlBQVk7UUFDbkMsTUFBTVEsWUFBWSxNQUFNUixZQUFZO1FBRXBDLE1BQU1TLGFBQWFWLE9BQU9XLFFBQVEsQ0FBQ0MsS0FBSyxDQUFDQyxHQUFHLENBQUM7UUFDN0MsTUFBTUMsY0FBY2QsT0FBT1csUUFBUSxDQUFDQyxLQUFLLENBQUNDLEdBQUcsQ0FBQztRQUU5QyxJQUFJLENBQUNILFlBQVk7WUFDaEJLLFFBQVFDLEtBQUssQ0FBQztZQUNkLE9BQU87UUFDUjtRQUVBLElBQUlOLFdBQVdPLFdBQVcsSUFBSTtZQUM3QixNQUFNQyxNQUFNLE1BQU1SLFdBQVdTLFFBQVEsQ0FBQ0MsS0FBSyxDQUFDO1lBRTVDLElBQUlGLEtBQUs7Z0JBQ1IsTUFBTUEsSUFBSUcsSUFBSSxDQUFDO29CQUFFQyxRQUFRO3dCQUFDZDtxQkFBUztnQkFBQztZQUNyQyxPQUFPO2dCQUNOLElBQUlFLFdBQVdhLFVBQVUsSUFBSTtvQkFDNUIsTUFBTWIsV0FBV2MsSUFBSSxDQUFDO3dCQUFFRixRQUFROzRCQUFDZDt5QkFBUztvQkFBQztnQkFDNUM7WUFDRDtRQUNEO1FBRUEsSUFBSSxDQUFDTSxhQUFhO1lBQ2pCQyxRQUFRQyxLQUFLLENBQUM7WUFDZCxPQUFPO1FBQ1I7UUFFQSxJQUFJRixZQUFZRyxXQUFXLElBQUk7WUFDOUIsTUFBTUMsTUFBTSxNQUFNSixZQUFZSyxRQUFRLENBQUNDLEtBQUssQ0FBQztZQUU3QyxJQUFJRixLQUFLO2dCQUNSLE1BQU1BLElBQUlHLElBQUksQ0FBQztvQkFBRUMsUUFBUTt3QkFBQ2I7cUJBQVU7Z0JBQUM7WUFDdEMsT0FBTztnQkFDTixJQUFJSyxZQUFZUyxVQUFVLElBQUk7b0JBQzdCLE1BQU1ULFlBQVlVLElBQUksQ0FBQzt3QkFBRUYsUUFBUTs0QkFBQ2I7eUJBQVU7b0JBQUM7Z0JBQzlDO1lBQ0Q7UUFDRDtJQUNELEdBQUcsT0FBTyxLQUFJLHNCQUFzQjtBQUNyQyxDQUFBLEVBQUMifQ==