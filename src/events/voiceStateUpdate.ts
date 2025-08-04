import { VoiceState, ChannelType, PermissionsBitField } from 'discord.js';

const TARGET_CHANNEL_ID = '1362764158038315108';  // channel that triggers creating temp channels
const CATEGORY_ID = '1209167408481173524';      // category for temp channels

// Track all created temporary channels here
const tempVoiceChannels = new Set<string>();

export default async (oldState: VoiceState, newState: VoiceState) => {
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
            deny: [PermissionsBitField.Flags.Connect],
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
              PermissionsBitField.Flags.Speak,
            ],
          },
        ],
        reason: `Private voice channel for ${member.user.tag}`,
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
};
