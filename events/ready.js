const { Events } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		//prints to terminal when bot is ready
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};
