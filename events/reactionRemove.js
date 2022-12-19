const { Events } = require('discord.js');
const { roleChannel, guildId } = require('../config.json');
const reactRoles = require('../reactRoles.json');

module.exports = {
	name: Events.MessageReactionRemove,
	async execute(reaction, user) {
		//gives role to user based on react (for roles channel)
		if (reaction.partial) {
			try {
				await reaction.fetch(); //gets full reaction data
			} catch (error) { 
				console.log('oop');
				return;
			}
		}
		//check in role channels
		if (reaction.message.channelId != roleChannel) return;

		const guild = reaction.client.guilds.cache.get(guildId);
		await guild.fetch();
		
		const emoji = reaction.emoji.name.codePointAt();

		//check matching role exists
		if (emoji in reactRoles) {
			const member = guild.members.cache.get(user.id);
			const role = reaction.message.guild.roles.cache.find(r => r.name == reactRoles[emoji]);
			member.roles.remove(role);
		} 
	},
};
