const { SlashCommandBuilder, Collection } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription("displays list of sloop sloop bot's features" 
		),
	async execute(interaction) {
		let help = "Hello! I can do the following:\n\n**Commands:**";
		//gets directory of commands
		interaction.client.commands = new Collection();
		const commandsPath = path.join(__dirname);
		const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

		//add commands to help string 
		for (const file of commandFiles) {
			const filePath = path.join(commandsPath, file);
			const command = require(filePath);
			// Set a new item in the Collection with the key as the command name and the value as the exported module
			if ('data' in command && 'execute' in command) {
				const commandDesc = '/' + command.data.name + ' - ' + command.data.description;
				help += '\n';
				help += commandDesc;
			} else {
				console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
			}
		}

		help += "\n**Roles:**\nReact with emojis in the #roles channel to get the matching roles";
		help += "\n**Other:**\n- factorial converter\n- s-word detector for a certain someone"
		await interaction.reply({content: `${help}`, ephemeral: true});
	},
};
