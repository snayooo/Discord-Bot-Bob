import { GuildMember } from 'discord.js'
import { client } from 'robo.js'
import db from '../utils/DBUtils'

export default async (member: GuildMember) => {
	const userId = member.id
	const username = member.user.username
	const avatarUrl = member.user.displayAvatarURL({ size: 1024, extension: 'png' })

	const dbUser = await db.user.findUnique({ where: { id: userId } })

	if (!userId || !username || !avatarUrl) {
		console.log(`Missing user information for member ${member.id}`)
		return true
	}

	if (dbUser) {
		console.log(`User ${username} (${userId}) already exists in the database.`)

		return true
	}

	await db.user.create({
		data: {
			discordUserId: userId,
			discordUsername: username,
			discordAvatarUrl: avatarUrl,
			discordDiscriminator: member.user.discriminator
		}
	})
}
