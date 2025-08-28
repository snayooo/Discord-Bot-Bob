import { ChatInputCommandInteraction } from 'discord.js'
import { createCommandConfig } from 'robo.js'
import db from '../../../utils/DBUtils'

export const config = createCommandConfig({
	description: 'Add a new sound to the server.',
	options: [
		{
			name: 'servername',
			description: 'The name of the minecraft server.',
			type: 'string',
			required: true
		},
		{
			name: 'embed-value',
			description: 'The value to embed in the message.',
			type: 'string',
			required: true
		},
		{
			name: 'connection-ip',
			description: 'The connection IP of the minecraft server.',
			type: 'string',
			required: true
		},
		{
			name: 'ip',
			description: 'The IP address of the minecraft server.',
			type: 'string',
			required: true
		},
		{
			name: 'port',
			description: 'The port of the minecraft server.',
			type: 'integer',
			required: true
		},
		{
			name: 'rcon-port',
			description: 'The RCON port of the minecraft server.',
			type: 'integer',
			required: true
		},
		{
			name: 'rcon-password',
			description: 'The RCON password of the minecraft server.',
			type: 'string',
			required: true
		},
		{
			name: 'server-version',
			description: 'The version of the minecraft server.',
			type: 'string',
			required: true
		},
		{
			name: 'server-software',
			description: 'The software of the minecraft server.',
			type: 'string',
			required: true
		}
	]
} as const)

export default async (interaction: ChatInputCommandInteraction) => {
	const serverName = interaction.options.getString('servername')
	const embedValue = interaction.options.getString('embed-value')
	const connectionIP = interaction.options.getString('connection-ip')
	const ip = interaction.options.getString('ip')
	const port = interaction.options.getInteger('port')
	const rconPort = interaction.options.getInteger('rcon-port')
	const rconPassword = interaction.options.getString('rcon-password')
	const serverVersion = interaction.options.getString('server-version')
	const serverSoftware = interaction.options.getString('server-software') || 'Unknown'

	if (!serverName || !embedValue || !connectionIP || !ip || !port || !rconPort || !rconPassword || !serverVersion || !serverSoftware) {
		await interaction.reply({ content: 'Please provide all required fields.', ephemeral: true })
		return
	}

	const dbServer = await db.server.findUnique({ where: { name: serverName } })

	if (dbServer) {
		await interaction.reply({ content: 'Server already exists.', ephemeral: true })
		return
	}

	await db.server.create({
		data: {
			name: serverName,
			value: embedValue,
			connIp: connectionIP,
			ip: ip,
			port: port,
			rconPort: rconPort,
			rconPassword: rconPassword,
			serverVersion: serverVersion,
			serverSoftware: serverSoftware
		}
	})

	await interaction.reply({
		content: `Server added successfully! **${serverName}** is now configured. **IP:** ${ip}, **Port:** ${port}, **RCON Port:** ${rconPort}`,
		ephemeral: true
	})
}
