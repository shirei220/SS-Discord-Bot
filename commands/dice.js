const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('d20')
		.setDescription('rolls a d20 dice'),
	async execute(interaction) {
        const res = Math.floor(Math.random() * 20) + 1;
		await interaction.reply({content: `${res}`});
	},
};
