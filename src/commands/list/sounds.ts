import { ChatInputCommandInteraction } from "discord.js"
import { createCommandConfig } from "robo.js";
import fs from "fs";

export const config = createCommandConfig({
    description: 'List of all available sounds.',
} as const)

export default async (interaction: ChatInputCommandInteraction) => {

}