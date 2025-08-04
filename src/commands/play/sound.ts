import { createCommandConfig } from "robo.js";
import { ChatInputCommandInteraction, GuildMember } from "discord.js";
import { createAudioPlayer, createAudioResource, joinVoiceChannel, AudioResource } from "@discordjs/voice";
import { promises as fs } from "fs";
import path from "path";

export const config = createCommandConfig({
    description: 'Play a sound.',
    options: [
        {
            name: 'sound',
            description: 'The sound of the file to play. Type /list sounds to see the list of available sounds.',
            type: 'string',
            required: true
        }
    ]
} as const)

export default async (interaction: ChatInputCommandInteraction) => {
    await interaction.deferReply({ ephemeral: true });

    return interaction.editReply("Command currently not working. It is in development.")

    const soundName = interaction.options.getString('sound');

    if (!soundName) {
        return interaction.editReply({
            content: 'Please provide a valid sound name.'
        });
    }

    const soundPath = path.join(__dirname, '../../sounds', `${soundName}.mp3`);

    await interaction.editReply({
        content: `Playing sound: **${soundName}**`
    });
};