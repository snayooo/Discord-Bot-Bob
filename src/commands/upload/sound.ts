import { ChatInputCommandInteraction } from 'discord.js';
import { client, createCommandConfig } from 'robo.js';
import fs from 'fs';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const config = createCommandConfig({
    description: 'Upload a sound.',
    options: [
        {
            name: 'sound',
            description: 'The sound file to upload',
            type: 'attachment',
            required: true
        }
    ]
} as const)

export default async (interaction: ChatInputCommandInteraction) => {
    await interaction.deferReply({ ephemeral: true });
    
    return interaction.editReply("Command currently not working. It is in development.");
    
    const soundFile = interaction.options.getAttachment('sound');

    
    if (!soundFile) {
        return interaction.editReply({
            content: 'Please provide a sound file to upload.'
        });
    }

    console.log(soundFile.url);

    try {
        // Download the file
        const res = await fetch(soundFile.url);
        
        if (!res.ok) {
            throw new Error(`Failed to fetch file: ${res.statusText}`);
        }

        // Create the sounds directory if it doesn't exist
        const soundsDir = path.join(__dirname, '../../sounds');
        if (!fs.existsSync(soundsDir)) {
            fs.mkdirSync(soundsDir, { recursive: true });
        }

        // Generate file path
        const fileName = soundFile.name;
        const filePath = path.join(soundsDir, fileName);

        // Check if file already exists
        if (fs.existsSync(filePath)) {
            return interaction.editReply({
                content: `Sound file ${fileName} already exists!`
            });
        }

        // Create write stream and download file
        const fileStream = fs.createWriteStream(filePath);
        
        await new Promise<void>((resolve, reject) => {
            res.body.pipe(fileStream);
            res.body.on('error', reject);
            fileStream.on('finish', () => resolve());
            fileStream.on('error', reject);
        });

        console.log(`File saved to: ${filePath}`);

    } catch (error) {
        console.error(error);
        return interaction.editReply({
            content: 'Failed to upload sound file.'
        });
    }

    await interaction.editReply({
        content: `Sound file ${soundFile.name} uploaded successfully!`
    });
};