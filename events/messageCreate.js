const { Events } = require('discord.js');
const { certainUser } = require('../config.json');

module.exports = {
	name: Events.MessageCreate,
	async execute(msg) {
		let content = msg.content;

		//check if user is certain someone and has a certain word
		if (msg.author.tag == certainUser && /sorry/i.test(content)) {
			const options = ['wHaT WaS THAT?!?', 'NO S-WORDS ALLOWED!!!', 'UNACCEPTABLE!!!', '* gasps *', 'YOU DAre sAY THE ForBIDDEN WORD?!?'];
			const randomIndex = Math.floor(Math.random() * options.length);
			msg.reply(options[randomIndex]);
		}

		//checks if someone accidentally typed a factorial and replies accordingly
		if (/[0-9]!/.test(content)) {
			function factorial(match) {
				let temp = parseInt(match.split('!')[0]); //removes ! and converts to int
				let ans = 1;
				for (let i = 2; i <= temp; i++)
					ans = ans * i;
				return ans.toString();
			}
			msg.reply(content.replaceAll(/[0-9][0-9]*!/g, factorial));
		}

		//
	},
};
