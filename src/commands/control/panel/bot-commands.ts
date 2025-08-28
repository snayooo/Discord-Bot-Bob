import { ChatInputCommandInteraction } from 'discord.js'
import { createCommandConfig } from 'robo.js'

export const config = createCommandConfig({
	description: 'List of bot commands'
} as const)

export default async (interaction: ChatInputCommandInteraction) => {
	await interaction.reply({
		content: `# **Bot Commands** \nA list with all the commands of the bot.\n## **Public Commands:**\n### **Database Commands:**\n- **/register** - Register yourself to the database.\n- **/link minecraft <mcusername>** - Link your Minecraft account.\n### **Economy Commands:**\n- **/daily** - Collect your daily coins.\n### **Music Commands:** (in development)\n- **/play song <song>** - Play a song.\n- **/play sound <soundname>** - Plays an uploaded sound.\n- **/queue** - Show the current song queue.\n- **/skip** - Skip the current song.\n- **/stop** - Stop the current song.\n- **/upload sound <file>** - Upload a sound file.\n### **Miscellaneous Commands:**\n- **/ping** - Show the bot's latency.\n## **Admin Commands:**\n### **Control Commands:**\n- **/control bot restart** - Restarts the bot.\n- **/control message self-roles** - Sends the self roles embed.\n- **/control panel bot-commands** - Sends this message.\n- **/control panel minecraft <servername>** - Sends a Minecraft server statistics panel. (Updates every minute).\n- **/control server add** - Adds a Minecraft server to the database.`
	})
}
