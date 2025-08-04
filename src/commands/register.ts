import { ChatInputCommandInteraction } from "discord.js";
import { createCommandConfig } from "robo.js";
import db from "../utils/DBUtils";

export const config = createCommandConfig({
    description: 'Registers a new user in the system.'
} as const)

export default async (interaction: ChatInputCommandInteraction) => {

    await interaction.deferReply({ ephemeral: true });
    await interaction.editReply('Registering...');
    
    const userId = interaction.user.id;
    const username = interaction.user.username;

    const dbUser = await db.user.findUnique({
        where: {
            discordUserId: userId
        }
    })
    if(dbUser) {
        return 'You are already registered!';
    }

    try {
        const newDBUser = await db.user.create({
            data: {
                discordUserId: userId,
                discordUsername: username,
                discordDiscriminator: interaction.user.discriminator,
                discordAvatarUrl: interaction.user.avatarURL() || ''
            }
        })

        await interaction.editReply(`You have been registered successfully!`);
    } catch (error) {
        console.error('Error creating user:', error);
        return interaction.editReply('There was an error registering you.');
    }

}