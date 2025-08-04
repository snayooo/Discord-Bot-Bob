import { ChatInputCommandInteraction } from "discord.js";
import { createCommandConfig } from "robo.js";
import db from "../../../utils/DBUtils";

export const config = createCommandConfig({
    description: 'Add a new sound to the server.',
    options: [
        {
            name: 'servername',
            description: 'The name of the minecraft server.',
            type: 'string',
            required: true,
        },
        {
            name: 'embed-value',
            description: 'The value to embed in the message.',
            type: 'string',
            required: true,
        },
        {
            name: 'connection-ip',
            description: 'The connection IP of the minecraft server.',
            type: 'string',
            required: true,
        },
        {
            name: 'ip',
            description: 'The IP address of the minecraft server.',
            type: 'string',
            required: true,
        },
        {
            name: 'port',
            description: 'The port of the minecraft server.',
            type: 'integer',
            required: true,
        },
        {
            name: 'rcon-port',
            description: 'The RCON port of the minecraft server.',
            type: 'integer',
            required: true,
        },
        {
            name: 'rcon-password',
            description: 'The RCON password of the minecraft server.',
            type: 'string',
            required: true,
        },
        {
            name: 'ssh-user',
            description: 'The SSH user for the server.',
            type: 'string',
            required: true,
        },
        {
            name: 'ssh-password',
            description: 'The SSH password for the server.',
            type: 'string',
            required: true,
        }
    ]
} as const)

export default async (interaction: ChatInputCommandInteraction) => {
    const serverName = interaction.options.getString('servername');
    const embedValue = interaction.options.getString('embed-value');
    const connectionIP = interaction.options.getString('connection-ip');
    const ip = interaction.options.getString('ip');
    const port = interaction.options.getInteger('port');
    const rconPort = interaction.options.getInteger('rcon-port');
    const rconPassword = interaction.options.getString('rcon-password');
    const sshUser = interaction.options.getString('ssh-user');
    const sshPassword = interaction.options.getString('ssh-password');

    if (!serverName || !embedValue || !connectionIP || !ip || !port || !rconPort || !rconPassword || !sshUser || !sshPassword) {
        await interaction.reply({ content: 'Please provide all required fields.', ephemeral: true });
        return;
    }

    const dbServer = await db.server.findUnique({ where: { name: serverName } });

    if (dbServer) {
        await interaction.reply({ content: 'Server already exists.', ephemeral: true });
        return;
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
            sshUser: sshUser,
            sshPassword: sshPassword
        }
    });

    await interaction.reply({ content: `Server added successfully! **${serverName}** is now configured. **IP:** ${ip}, **Port:** ${port}, **RCON Port:** ${rconPort}, **SSH User:** ${sshUser}`, ephemeral: true });
}