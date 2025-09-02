import { ChatInputCommandInteraction } from "discord.js";
import { createCommandConfig } from "robo.js";
import db from "../../utils/DBUtils";
import axios from "axios";

export const config = createCommandConfig({
    description: "Create a website login. WEB COMING SOON.",
    options: [
        {
            name: "email",
            description: "Your email address.",
            type: "string",
            required: true
        },
        {
            name: "first_name",
            description: "Your first name.",
            type: "string",
            required: true
        },
        {
            name: "last_name",
            description: "Your last name.",
            type: "string",
            required: true
        },
        {
            name: "password",
            description: "Create a password. It will be encrypted and stored securely. It needs to be at least 8 characters long.",
            type: "string",
            required: true
        },
    ]
} as const)

export default async ( interaction: ChatInputCommandInteraction ) => {
    const email = interaction.options.getString("email");
    const firstName = interaction.options.getString("first_name");
    const lastName = interaction.options.getString("last_name");
    const password = interaction.options.getString("password");
    const username = interaction.user.username;

    const dbUser = await db.user.findUnique({
        where: {
            discordUserId: interaction.user.id,
        }
    });

    if (!dbUser) {
        return interaction.reply({
            content: "You need to register yourself first using /register.",
            ephemeral: true
        });
    }

    if (dbUser.websiteEmail) {
        return interaction.reply({
            content: `You already have a website account linked! If you want to change it, please contact @snayo.\n\n**Current data:**\nEmail: ${dbUser.websiteEmail}\nFirst Name: ${dbUser.websiteFirstName}\nLast Name: ${dbUser.websiteLastName}`,
            ephemeral: true
        });
    }

    if (!email || !firstName || !lastName || !password) {
        return interaction.reply({
            content: "Please provide all required fields.",
            ephemeral: true
        });
    }

    if (password.length < 8) {
        return interaction.reply({
            content: "Password must be at least 8 characters long.",
            ephemeral: true
        });
    }

    try {
        
        const res = await axios.post("", {
            "Authentication": `Bearer ${process.env.WEBSITE_API_KEY}`,
            "Content-Type": "application/json",
            "Data": {
                external_id: dbUser.id,
                email_address: email,
                first_name: firstName,
                last_name: lastName,
                password: password,
                username: username
            }
        })

    } catch (error) {
        console.log(error);
    }

}