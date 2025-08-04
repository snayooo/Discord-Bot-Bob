import { ChannelType, PermissionsBitField } from "discord.js";
const TARGET_CHANNEL_ID = '1362764158038315108'; // channel that triggers creating temp channels
const CATEGORY_ID = '1209167408481173524'; // category for temp channels
// Track all created temporary channels here
const tempVoiceChannels = new Set();
export default (async (oldState, newState)=>{
    const guild = newState.guild;
    // 1) When someone joins the target channel -> create temp channel, move user there
    if (newState.channelId === TARGET_CHANNEL_ID && oldState.channelId !== TARGET_CHANNEL_ID) {
        const member = newState.member;
        if (!member) return;
        try {
            const newChannel = await guild.channels.create({
                name: `${member.user.username}'s Channel`,
                type: ChannelType.GuildVoice,
                parent: CATEGORY_ID,
                permissionOverwrites: [
                    {
                        id: guild.roles.everyone,
                        deny: [
                            PermissionsBitField.Flags.Connect
                        ]
                    },
                    {
                        id: member.id,
                        allow: [
                            PermissionsBitField.Flags.Connect,
                            PermissionsBitField.Flags.ManageChannels,
                            PermissionsBitField.Flags.MuteMembers,
                            PermissionsBitField.Flags.DeafenMembers,
                            PermissionsBitField.Flags.MoveMembers,
                            PermissionsBitField.Flags.ViewChannel,
                            PermissionsBitField.Flags.Speak
                        ]
                    }
                ],
                reason: `Private voice channel for ${member.user.tag}`
            });
            tempVoiceChannels.add(newChannel.id);
            if (member.voice.channel) {
                await member.voice.setChannel(newChannel);
            }
            console.log(`Created temp voice channel ${newChannel.name} and moved ${member.user.tag} there.`);
        } catch (error) {
            console.error('Error creating/moving to new voice channel:', error);
        }
    }
    // 2) When someone leaves any voice channel, check if it was a temp channel and empty → delete it
    if (oldState.channelId && tempVoiceChannels.has(oldState.channelId)) {
        const oldChannel = guild.channels.cache.get(oldState.channelId);
        if (!oldChannel) {
            // Channel might already be deleted
            tempVoiceChannels.delete(oldState.channelId);
            return;
        }
        // If no one is left in the channel, delete it and remove from tracking
        if (oldChannel.members.size === 0) {
            try {
                await oldChannel.delete('Temporary voice channel empty, deleting...');
                tempVoiceChannels.delete(oldState.channelId);
                console.log(`Deleted empty temporary voice channel ${oldChannel.name}.`);
            } catch (error) {
                console.error('Failed to delete temporary voice channel:', error);
            }
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6XFxEZXZlbG9wZW1lbnRcXERpc2NvcmQgQm90c1xcSmF2YVNjcmlwdFxcQm9iXFxzcmNcXGV2ZW50c1xcdm9pY2VTdGF0ZVVwZGF0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBWb2ljZVN0YXRlLCBDaGFubmVsVHlwZSwgUGVybWlzc2lvbnNCaXRGaWVsZCB9IGZyb20gJ2Rpc2NvcmQuanMnO1xyXG5cclxuY29uc3QgVEFSR0VUX0NIQU5ORUxfSUQgPSAnMTM2Mjc2NDE1ODAzODMxNTEwOCc7ICAvLyBjaGFubmVsIHRoYXQgdHJpZ2dlcnMgY3JlYXRpbmcgdGVtcCBjaGFubmVsc1xyXG5jb25zdCBDQVRFR09SWV9JRCA9ICcxMjA5MTY3NDA4NDgxMTczNTI0JzsgICAgICAvLyBjYXRlZ29yeSBmb3IgdGVtcCBjaGFubmVsc1xyXG5cclxuLy8gVHJhY2sgYWxsIGNyZWF0ZWQgdGVtcG9yYXJ5IGNoYW5uZWxzIGhlcmVcclxuY29uc3QgdGVtcFZvaWNlQ2hhbm5lbHMgPSBuZXcgU2V0PHN0cmluZz4oKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChvbGRTdGF0ZTogVm9pY2VTdGF0ZSwgbmV3U3RhdGU6IFZvaWNlU3RhdGUpID0+IHtcclxuICBjb25zdCBndWlsZCA9IG5ld1N0YXRlLmd1aWxkO1xyXG5cclxuICAvLyAxKSBXaGVuIHNvbWVvbmUgam9pbnMgdGhlIHRhcmdldCBjaGFubmVsIC0+IGNyZWF0ZSB0ZW1wIGNoYW5uZWwsIG1vdmUgdXNlciB0aGVyZVxyXG4gIGlmIChuZXdTdGF0ZS5jaGFubmVsSWQgPT09IFRBUkdFVF9DSEFOTkVMX0lEICYmIG9sZFN0YXRlLmNoYW5uZWxJZCAhPT0gVEFSR0VUX0NIQU5ORUxfSUQpIHtcclxuICAgIGNvbnN0IG1lbWJlciA9IG5ld1N0YXRlLm1lbWJlcjtcclxuICAgIGlmICghbWVtYmVyKSByZXR1cm47XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgbmV3Q2hhbm5lbCA9IGF3YWl0IGd1aWxkLmNoYW5uZWxzLmNyZWF0ZSh7XHJcbiAgICAgICAgbmFtZTogYCR7bWVtYmVyLnVzZXIudXNlcm5hbWV9J3MgQ2hhbm5lbGAsXHJcbiAgICAgICAgdHlwZTogQ2hhbm5lbFR5cGUuR3VpbGRWb2ljZSxcclxuICAgICAgICBwYXJlbnQ6IENBVEVHT1JZX0lELFxyXG4gICAgICAgIHBlcm1pc3Npb25PdmVyd3JpdGVzOiBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGlkOiBndWlsZC5yb2xlcy5ldmVyeW9uZSxcclxuICAgICAgICAgICAgZGVueTogW1Blcm1pc3Npb25zQml0RmllbGQuRmxhZ3MuQ29ubmVjdF0sXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBpZDogbWVtYmVyLmlkLFxyXG4gICAgICAgICAgICBhbGxvdzogW1xyXG4gICAgICAgICAgICAgIFBlcm1pc3Npb25zQml0RmllbGQuRmxhZ3MuQ29ubmVjdCxcclxuICAgICAgICAgICAgICBQZXJtaXNzaW9uc0JpdEZpZWxkLkZsYWdzLk1hbmFnZUNoYW5uZWxzLFxyXG4gICAgICAgICAgICAgIFBlcm1pc3Npb25zQml0RmllbGQuRmxhZ3MuTXV0ZU1lbWJlcnMsXHJcbiAgICAgICAgICAgICAgUGVybWlzc2lvbnNCaXRGaWVsZC5GbGFncy5EZWFmZW5NZW1iZXJzLFxyXG4gICAgICAgICAgICAgIFBlcm1pc3Npb25zQml0RmllbGQuRmxhZ3MuTW92ZU1lbWJlcnMsXHJcbiAgICAgICAgICAgICAgUGVybWlzc2lvbnNCaXRGaWVsZC5GbGFncy5WaWV3Q2hhbm5lbCxcclxuICAgICAgICAgICAgICBQZXJtaXNzaW9uc0JpdEZpZWxkLkZsYWdzLlNwZWFrLFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICBdLFxyXG4gICAgICAgIHJlYXNvbjogYFByaXZhdGUgdm9pY2UgY2hhbm5lbCBmb3IgJHttZW1iZXIudXNlci50YWd9YCxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICB0ZW1wVm9pY2VDaGFubmVscy5hZGQobmV3Q2hhbm5lbC5pZCk7XHJcblxyXG4gICAgICBpZiAobWVtYmVyLnZvaWNlLmNoYW5uZWwpIHtcclxuICAgICAgICBhd2FpdCBtZW1iZXIudm9pY2Uuc2V0Q2hhbm5lbChuZXdDaGFubmVsKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc29sZS5sb2coYENyZWF0ZWQgdGVtcCB2b2ljZSBjaGFubmVsICR7bmV3Q2hhbm5lbC5uYW1lfSBhbmQgbW92ZWQgJHttZW1iZXIudXNlci50YWd9IHRoZXJlLmApO1xyXG5cclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGNyZWF0aW5nL21vdmluZyB0byBuZXcgdm9pY2UgY2hhbm5lbDonLCBlcnJvcik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyAyKSBXaGVuIHNvbWVvbmUgbGVhdmVzIGFueSB2b2ljZSBjaGFubmVsLCBjaGVjayBpZiBpdCB3YXMgYSB0ZW1wIGNoYW5uZWwgYW5kIGVtcHR5IOKGkiBkZWxldGUgaXRcclxuICBpZiAob2xkU3RhdGUuY2hhbm5lbElkICYmIHRlbXBWb2ljZUNoYW5uZWxzLmhhcyhvbGRTdGF0ZS5jaGFubmVsSWQpKSB7XHJcbiAgICBjb25zdCBvbGRDaGFubmVsID0gZ3VpbGQuY2hhbm5lbHMuY2FjaGUuZ2V0KG9sZFN0YXRlLmNoYW5uZWxJZCk7XHJcbiAgICBpZiAoIW9sZENoYW5uZWwpIHtcclxuICAgICAgLy8gQ2hhbm5lbCBtaWdodCBhbHJlYWR5IGJlIGRlbGV0ZWRcclxuICAgICAgdGVtcFZvaWNlQ2hhbm5lbHMuZGVsZXRlKG9sZFN0YXRlLmNoYW5uZWxJZCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBJZiBubyBvbmUgaXMgbGVmdCBpbiB0aGUgY2hhbm5lbCwgZGVsZXRlIGl0IGFuZCByZW1vdmUgZnJvbSB0cmFja2luZ1xyXG4gICAgaWYgKG9sZENoYW5uZWwubWVtYmVycy5zaXplID09PSAwKSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgYXdhaXQgb2xkQ2hhbm5lbC5kZWxldGUoJ1RlbXBvcmFyeSB2b2ljZSBjaGFubmVsIGVtcHR5LCBkZWxldGluZy4uLicpO1xyXG4gICAgICAgIHRlbXBWb2ljZUNoYW5uZWxzLmRlbGV0ZShvbGRTdGF0ZS5jaGFubmVsSWQpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGBEZWxldGVkIGVtcHR5IHRlbXBvcmFyeSB2b2ljZSBjaGFubmVsICR7b2xkQ2hhbm5lbC5uYW1lfS5gKTtcclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gZGVsZXRlIHRlbXBvcmFyeSB2b2ljZSBjaGFubmVsOicsIGVycm9yKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufTtcclxuIl0sIm5hbWVzIjpbIkNoYW5uZWxUeXBlIiwiUGVybWlzc2lvbnNCaXRGaWVsZCIsIlRBUkdFVF9DSEFOTkVMX0lEIiwiQ0FURUdPUllfSUQiLCJ0ZW1wVm9pY2VDaGFubmVscyIsIlNldCIsIm9sZFN0YXRlIiwibmV3U3RhdGUiLCJndWlsZCIsImNoYW5uZWxJZCIsIm1lbWJlciIsIm5ld0NoYW5uZWwiLCJjaGFubmVscyIsImNyZWF0ZSIsIm5hbWUiLCJ1c2VyIiwidXNlcm5hbWUiLCJ0eXBlIiwiR3VpbGRWb2ljZSIsInBhcmVudCIsInBlcm1pc3Npb25PdmVyd3JpdGVzIiwiaWQiLCJyb2xlcyIsImV2ZXJ5b25lIiwiZGVueSIsIkZsYWdzIiwiQ29ubmVjdCIsImFsbG93IiwiTWFuYWdlQ2hhbm5lbHMiLCJNdXRlTWVtYmVycyIsIkRlYWZlbk1lbWJlcnMiLCJNb3ZlTWVtYmVycyIsIlZpZXdDaGFubmVsIiwiU3BlYWsiLCJyZWFzb24iLCJ0YWciLCJhZGQiLCJ2b2ljZSIsImNoYW5uZWwiLCJzZXRDaGFubmVsIiwiY29uc29sZSIsImxvZyIsImVycm9y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