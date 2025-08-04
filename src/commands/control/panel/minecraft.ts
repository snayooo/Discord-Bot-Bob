import { ChatInputCommandInteraction } from 'discord.js'
import { createCommandConfig } from 'robo.js'
import { serverEmbed } from '../../../utils/mcUtils'

export const config = createCommandConfig({
	description: 'Sends a control panel embed for Minecraft servers.',
	options: [
		{
			name: 'server',
			description: 'The Minecraft server to control.',
			type: 'string',
			required: true,
			choices: [
				{ name: 'SMP', value: 'smp' },
				{ name: 'Lele1337', value: 'lele1337' }
			]
		}
	],
	defaultMemberPermissions: 8
} as const)

export default async (interaction: ChatInputCommandInteraction) => {
	await interaction.deferReply()

	const selectedServer = interaction.options.getString('server')

	if (!selectedServer) {
		return await interaction.editReply({
			content: 'Please select a server to control.'
		})
	}

	const embed = await serverEmbed(selectedServer)

	await interaction.editReply({ embeds: [embed] })
}
