import { client, createCommandConfig, logger } from 'robo.js'
import type { ChatInputCommandInteraction, Client } from 'discord.js'

export const config = createCommandConfig({
	description: 'Replies with Pong!'
} as const)

export default (interaction: ChatInputCommandInteraction) => {
	logger.info(`Ping command used by ${interaction.user}`)

	interaction.reply(`Pong! Latency: ${new Date().getTime() - interaction.createdTimestamp}ms`)
}
