import { EmbedBuilder } from 'discord.js'
import db from './DBUtils'
import axios from 'axios'
import { getRconClient } from './rconUtils'

export async function serverEmbed(value: string) {
	if (!value) {
		throw new Error('Server name is required.')
	}

	function getTPS(str: string): string | null {
		const match = str.match(/§a(.{2})/)
		return match ? match[1] : null
	}

	function extractReservedUsedRAM(text: string): string {
		const line = text.split('\n')[0] // Isolate the first line
		const phrase = 'Reserved used RAM: §7'
		const startIndex = line.indexOf(phrase)

		// If the phrase is not found on the first line, return an empty string
		if (startIndex === -1) {
			return ''
		}

		// Calculate the starting position of the value and unit
		const startOfResult = startIndex + phrase.length

		// Find the index of the newline character or the end of the string
		const endOfLineIndex = line.indexOf('\n', startOfResult)

		// Extract the substring containing the value and unit
		if (endOfLineIndex === -1) {
			// If no newline is found, take the rest of the string
			return line.substring(startOfResult).trim()
		} else {
			// Otherwise, take the substring up to the newline
			return line.substring(startOfResult, endOfLineIndex).trim()
		}
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
	let serverSoftware: string = 'Unknown'
	let memoryUsage: any = 'Unknown'
	let tps: any = 'Unknown'

	try {
		const res = await axios.get(`https://api.mcsrvstat.us/3/${dbServer.ip}:${dbServer.port}`)

		const data = res.data

		if (data.online) {
			status = '🟢Online'
			onlinePlayers = data.players.online
			maxPlayers = data.players.max
			serverSoftware = data.software

			if (serverSoftware == 'Paper') {
				const rcon = await getRconClient(dbServer.value)
				if (rcon) {
					const rcontps = await rcon.send('tps')
					tps = getTPS(rcontps)

					const rconmem = await rcon.send('system')
					memoryUsage = extractReservedUsedRAM(rconmem)
				}
			}
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
		maxPlayers: maxPlayers,
		onlinePlayers: onlinePlayers,
		status: status,
		serverSoftware: dbServer.serverSoftware,
		memory: memoryUsage,
		tps: tps,
		serverVersion: dbServer.serverVersion
	}

	const embed = new EmbedBuilder()
		.setTitle(`__**Panel for ${mcserver.name}**__`)
		.setDescription(`Here you can see information about the server.`)
		.addFields({ name: '**Server Software:**', value: `${mcserver.serverSoftware}` })
		.addFields({ name: '**Server Version:**', value: `${mcserver.serverVersion}` })
		.addFields({ name: '**IP:**', value: `${"```"}${mcserver.connectionIp}${"```"}` })
		.addFields({ name: '**Players:**', value: `${mcserver.onlinePlayers}/${mcserver.maxPlayers}` })
		.addFields({ name: '**Status:**', value: `${mcserver.status}` })
		.addFields({ name: '**Memory:**', value: `${mcserver.memory}` })
		.addFields({ name: '**TPS:**', value: `${mcserver.tps}` })
		.setColor('Green')
		.setTimestamp()

	return embed
}
