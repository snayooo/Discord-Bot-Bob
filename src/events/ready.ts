import { ActivityType } from 'discord.js'
import { client } from 'robo.js'
import { serverEmbed } from '../utils/mcUtils'

export default () => {
	client.user?.setActivity({
		name: 'you',
		type: ActivityType.Watching
	})

	// Update the Minecraft server embeds every minute
	setInterval(async () => {
		const smpEmbed = await serverEmbed('smp')
		const leleEmbed = await serverEmbed('lele1337')

		const smpChannel = client.channels.cache.get('1401593913793577020')
		const leleChannel = client.channels.cache.get('1401593876191645796')

		if (!smpChannel) {
			console.error('SMP channel not found.')
			return false
		}

		if (smpChannel.isTextBased()) {
			const msg = await smpChannel.messages.fetch('1401921188074361034')

			if (msg) {
				await msg.edit({ embeds: [smpEmbed] })
			} else {
				if (smpChannel.isSendable()) {
					await smpChannel.send({ embeds: [smpEmbed] })
				}
			}
		}

		if (!leleChannel) {
			console.error('Lele channel not found.')
			return false
		}

		if (leleChannel.isTextBased()) {
			const msg = await leleChannel.messages.fetch('1401921459076464812')

			if (msg) {
				await msg.edit({ embeds: [leleEmbed] })
			} else {
				if (leleChannel.isSendable()) {
					await leleChannel.send({ embeds: [leleEmbed] })
				}
			}
		}
	}, 1000 * 60) // Update every minute
}
