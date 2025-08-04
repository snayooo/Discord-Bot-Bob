import { EmbedBuilder } from 'discord.js'
import db from './DBUtils'
import axios from 'axios'

export async function serverEmbed(value: string) {
	if (!value) {
		throw new Error('Server name is required.')
	}

	const dbServer = await db.server.findFirst({
		where: {
			value: value
		}
	})

	if (!dbServer) {
		throw new Error(`Server ${value} not found in the database.`)
	}

    let status: string = 'Unknown'
    let onlinePlayers: number = 0
    let maxPlayers: number = 0

    try {
        
        const res = await axios.get(`https://api.mcsrvstat.us/3/${dbServer.ip}:${dbServer.port}`)

        const data = res.data

        if (data.online) {
            status = '🟢Online'
            onlinePlayers = data.players.online
            maxPlayers = data.players.max
        } else {
            status = '🔴Offline'
        }

    } catch (error) {
        console.error(`Error fetching server status for ${dbServer.name}:`, error)
        throw new Error(`Failed to fetch server status for ${dbServer.name}.`)
    }

	const mcserver = {
		name: dbServer.name,
		value: dbServer.value,
		connectionIp: dbServer.connIp,
		ip: dbServer.ip,
		port: dbServer.port,
		rconPort: dbServer.rconPort,
		rconPassword: dbServer.rconPassword,
		sshUsername: dbServer.sshUser,
		sshPassword: dbServer.sshPassword,
        maxPlayers: maxPlayers,
        onlinePlayers: onlinePlayers,
        status: status
	}

	const embed = new EmbedBuilder()
		.setTitle(`__**Panel for ${mcserver.name}**__`)
		.setDescription(`Here you can see information about the server.`)
		.addFields({ name: '**IP:**', value: `${mcserver.connectionIp}` })
        .addFields({ name: '**Players:**', value: `${mcserver.onlinePlayers}/${mcserver.maxPlayers}` })
        .addFields({ name: '**Status:**', value: `${mcserver.status}` })
        .setColor('Green')
        .setTimestamp()

	return embed
}
