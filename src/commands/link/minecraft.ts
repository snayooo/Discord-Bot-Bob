import { ChatInputCommandInteraction } from 'discord.js'
import { createCommandConfig } from 'robo.js'
import db from '../../utils/DBUtils'

export const config = createCommandConfig({
	description: 'Links your Discord account with your Minecraft account.',
	options: [
		{
			name: 'username',
			description: 'Your Minecraft username',
			type: 'string',
			required: true
		}
	]
} as const)

export default async (interaction: ChatInputCommandInteraction) => {
	await interaction.deferReply({ ephemeral: true })

	const userId = interaction.user.id
	const username = interaction.user.username

	const dbUser = await db.user.findUnique({
		where: {
			discordUserId: userId,
			discordUsername: username
		}
	})

	if (!dbUser) {
		return interaction.editReply(
			'You already have a Minecraft account linked! If you want to change it, please contact @snayo.'
		)
	}

	const minecraftUsername = await interaction.options.getString('username')

	if (!minecraftUsername) {
		return interaction.editReply('Please provide a valid Minecraft username.')
	}

	try {
		const res = await fetch(`https://playerdb.co/api/player/minecraft/${minecraftUsername}`)
		const json = (await res.json()) as { data: { player: { id: string } } }
		const uuid = json.data.player.id

		const updatedUser = await db.user.update({
			where: {
				discordUserId: userId
			},
			data: {
				minecraftUsername: minecraftUsername,
				minecraftId: uuid
			}
		})
	} catch (error) {
		console.error('Error linking Minecraft account:', error)
		return interaction.editReply('There was an error linking your Minecraft account. Please try again later.')
	}

    await interaction.editReply(`Your Minecraft account **${minecraftUsername}** has been successfully linked!`)
}
