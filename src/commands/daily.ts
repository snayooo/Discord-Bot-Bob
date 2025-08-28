import { ChatInputCommandInteraction } from 'discord.js'
import { createCommandConfig } from 'robo.js'
import db from '../utils/DBUtils'

export const config = createCommandConfig({
	description: 'Collect your daily coins.'
} as const)

export default async (interaction: ChatInputCommandInteraction) => {
	await interaction.deferReply({ ephemeral: true })

	const user = interaction.user

	const dbUser = await db.user.findUnique({
		where: {
			discordUserId: user.id
		}
	})

	if (!dbUser) {
		return interaction.editReply({
			content: 'You need to register first using the `/register` command.'
		})
	}

    const today = new Date().toDateString()
    const lastDaily = dbUser.lastDailyReward?.toDateString()

    if (lastDaily === today) {
        return interaction.editReply({
            content: 'You have already claimed your daily reward today.'
        })
    }

    const reward = Math.floor(Math.random() * 100) + 50 // Random reward between 50 and 150 coins

    const updatedUser = await db.user.update({
        where: {
            discordUserId: user.id
        },
        data: {
            coins: {
                increment: reward
            },
            lastDailyReward: new Date()
        }
    })

    interaction.editReply({
        content: `You have claimed your daily reward of **${reward}** coins! Your total coins are now **${updatedUser.coins}**.`
    })
}
