/*    This file is part of Howdy.

    Howdy is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    Howdy is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with Howdy.  If not, see <https://www.gnu.org/licenses/>. */

const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix, token } = require('./config.json');
const charCheck = require('./charCheck.js')
const randomColor = [getRandomInt(255), getRandomInt(255), getRandomInt(255)];
const emojis = ['🇦', '🇧', '🇨', '🇩', '🇪', '🇫', '🇬', '🇭', '🇮', '🇯', '🇰', '🇱', '🇲', '🇳', '🇴', '🇵', '🇶', '🇷', '🇸', '🇹', '🇺', '🇻', '🇼', '🇽', '🇾', '🇿'];
function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}
client.once('ready', () => {
	console.log('Ready!');
});
client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot || !message.guild) return;
	client.user.setActivity('/help', { type: 'LISTENING' });
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
	if (command === "ping" || command === "p") {
		// send back "Pong." to the channel the message was sent in
		const timeTaken = Date.now() - message.createdTimestamp;
		message.channel.send(`Pong! This message's latency was \`${timeTaken} ms\`.`);
	} else if (command === "server" || command === "s") {
		message.channel.send(`The server name is \`${message.guild.name}.\`\nThe server also has \`${message.guild.memberCount} members.\``);
	} else if (command === "add" || command === "sum") {
		const numArgs = args.map(x => parseFloat(x));
		const sum = numArgs.reduce((counter, x) => counter += x);
		message.reply(`The sum of all the arguments you provided is ${sum}!`);
	}
	else if (command === 'av' || command === 'avatar') {
		const avatar = new Discord.MessageEmbed();
		avatar.setTitle('Avatar');
		avatar.setAuthor('Howdy', client.user.displayAvatarURL({ format: "png", dynamic: true }));
		avatar.setColor(randomColor);

		if (!message.mentions.users.size) {
			avatar.setImage(message.author.displayAvatarURL({ format: "png", dynamic: true }))
			return message.channel.send(message.author.toString(), avatar);
		}

		const taggedUser = message.mentions.users.first();
		avatar.setImage(taggedUser.displayAvatarURL({ format: "png", dynamic: true }))
		message.channel.send(message.author.toString(), avatar);

	}
	else if (command === 'clear' || command === 'prune' || command === 'delete' || command === 'c') {
		function amountOne() { return amount = parseInt(args[0]) + 1; }
		if (isNaN(amountOne())) { return message.reply('That isn\'t a valid number.'); }
		else if (amountOne() < 2 || amountOne() > 100) { return message.reply('Please choose a number between 1 and 100'); }
		else if (amountOne() >= 2 && amountOne() <= 100) { message.channel.bulkDelete(amountOne()); }
		else { return message.channel.send('error'); }
	}
	else if (command === "hi" || command === "hello") {
		const greetings = ['Hi', 'Hola', 'హలో', 'Hallo', '你好', '여보세요', 'Merhaba', 'Ciao', 'Yo', 'Hey', 'Salut', 'Здравствуй', 'こんにちわ', 'Olá', 'Halløj',
			'Habari', 'Hoi', 'Yassou', 'Cześć', 'Halo', 'Helo', 'Hei'];
		return message.channel.send(`${greetings[getRandomInt(greetings.length)]} ${message.author.toString()}!`);
	}
	else if (command === 'help' || command === 'h') {
		const term = args[0]

		if (term === 'clear' || term === 'prune' || term === 'delete' || term === 'c') {
			return message.channel.send('Aliases: `clear`, `prune`, `delete`, `c`\n\nUsage: `clear <amount of messages>`');
		} else if (term === 'ping' || term === 'p') {
			return message.channel.send('Aliases: `ping`, `p`\n\nUsage: `ping`');
		} else if (term === 'help' || term === 'h') {
			return message.channel.send('Aliases: `help`, `h`\n\nUsage: `help [command]`');
		} else if (term === 'avatar' || term === 'av') {
			return message.channel.send('Aliases: `avatar`, `av`\n\nUsage: `avatar [username]`');
		} else if (term === 'add' || term === 'sum') {
			return message.channel.send('Aliases: `add`, `sum`\n\nUsage: `add <int> <int> [int] [int] [int]...`');
		} else if (term === 'server' || term === 's') {
			return message.channel.send('Aliases: `server`, `s`\n\nUsage: `server`');
		} else if (term === 'hi' || term === 'hello') {
			return message.channel.send('Aliases: `hi`, `hello`\n\nUsage: `hi`');
		} else if (term === 'botname' || term === 'botnickname' || term === 'botnick') {
			return message.channel.send('Aliases: `botname`, `botnickname`, `botnick`\n\nUsage: `botname <nickname>`');
		} else if (term === 'kick') {
			return message.channel.send('Aliases: `kick`\n\nUsage: `kick <user> [reason]');
		} else if (term === 'ban') {
			return message.channel.send('Aliases: `ban`\n\nUsage: `ban <user> <number of days of messages to delete> [reason]');
		} else if (term === 'nickname' || term === 'nick' || term === 'name' || term === 'mynickname' || term === 'mynick' || term === 'myname') {
			return message.channel.send('Aliases: `nickname`, `nick`, `name`, `mynickname`, `mynick`, `myname`\n\nUsage: `name <nickname>`');
		} else if (term === 'fortune' || term === 'eightball' || term === '8ball') {
			return message.channel.send('Aliases: `8ball`, `fortune`, `eightball`\n\nUsage: `8ball [question]`');
		} else {
			return message.channel.send(`
The prefix is \`${prefix}\`.\n\n\
\`help\`: displays information on all commands\n\
\`clear\`: Clears however many messages stated\n\
\`ping\`: sends a message and states its latency\n\
\`avatar\`: displays your or the mentioned person's avatar\n\
\`add\`: adds the arguments together\n\
\`server\`: gives server info\n\
\`hi\`: says hi to you in a multitude of languages\n\
\`botname\`: changes the bot's nickname in this server\n\
\`name\`: changes your nickname in this server\n\
\`kick\`: kicks the mentioned user\n\
\`ban\`: bans the mentioned user\n\
\`8ball\`: rolls a magic 8 ball\n\n
Type \`${prefix}help <command>\` to find out more.`);
		}
	}
	else if (command === 'botname' || command === 'botnickname' || command === 'botnick') {
		const name = args.join(' ');	
		if (message.member.hasPermission('ADMINISTRATOR')) {
			if (message.guild.me.hasPermission('CHANGE_NICKNAME')) {
				if (name.length > 32) {
					message.channel.send('The new nickname cannot be longer than 32 characters!');
				}
				else { message.guild.me.setNickname(name); }
			}
			else if (!message.guild.me.hasPermission('CHANGE_NICKNAME')) {
				message.channel.send('I do not have the proper permissions to change the nickname!');
			}
		} else if (!message.member.hasPermission('ADMINISTRATOR')) {
			message.channel.send('You do not have the proper permissions to change the nickname!');
		} else { message.channel.send('That name cannot be used right now.'); }
	}
	else if (command === 'nickname' || command === 'nick' || command === 'name' || command === 'mynickname' || command === 'mynick' || command === 'myname') {
		const name = args.join(' ');
		if (message.member.hasPermission('CHANGE_NICKNAME')) {
			if (message.member.hasPermission('ADMINISTRATOR')) {
				message.reply('you cannot use this command because you are an admin!');
			}
			else if (!message.member.hasPermission('ADMINISTRATOR')) {
				if (message.guild.me.hasPermission('MANAGE_NICKNAMES')) {
					if (name.length > 32) {
						message.channel.send('The new nickname cannot be longer than 32 characters!');
					}
					else { message.member.setNickname(name); }
				}
				else if (!message.guild.me.hasPermission('MANAGE_NICKNAMES')) {
					message.channel.send('I do not have the proper permissions to change your nickname!');
				}
				else { message.channel.send('That name cannot be used right now.'); }
			}
			else { message.channel.send('error'); }
		}
		else if (!message.member.hasPermission('CHANGE_NICKNAME')) {
			message.channel.send('You do not have the proper permissions to change your nickname!');
		}
		else { message.channel.send('That name cannot be used right now.'); }
    }
	else if (command === 'kick') {

		const victim = message.mentions.members.first();
		const reasonArray = args.slice(1);
		let reason = reasonArray.join(' ');
		function spaghettifier() {
			reason = charCheck.check;
		}
		if (reason.length > 512) {
			message.channel.send("Your reason can't be longer than 512 characters!");
			spaghettifier();
		}
		if (message.member.hasPermission('KICK_MEMBERS')) {
			if (!message.mentions.users.size) { message.reply('you need to specify who to kick!'); }
			else {
				const confirmation = new Discord.MessageEmbed();
				confirmation.setTitle('Kick')
				confirmation.setAuthor('Howdy', client.user.displayAvatarURL({ format: "png", dynamic: true }))
				confirmation.setColor(randomColor)
				confirmation.setImage(victim.user.displayAvatarURL({ format: "png", dynamic: true }))
				if (victim.kickable) {
					if (reason === charCheck.check) {}
					else if (!reason) {
						victim.kick();
						confirmation.setDescription(`${victim} has been kicked by ${message.author}.`)
						message.channel.send(message.author.toString(), confirmation);
					} else {
						victim.kick(reason);
						confirmation.setDescription(`${victim} has been kicked by ${message.author} because:\n${reason}`)
						message.channel.send(message.author.toString(), confirmation);
					}
				} else if (!victim.kickable) { message.channel.send('I can\'t kick this person!'); }
				else { message.channel.send('error'); }
			}
		}
		else { message.reply(`you don't have the necessary permissions to do this!`); }
	}
	else if (command === 'ban') {
		const victim = message.mentions.members.first();
		const banReasonArray = args.slice(2);
		let banReason = banReasonArray.join(' ');
		function spaghettifier () {
			banReason = charCheck.check;
        }
		if (banReason.length > 512) {
			message.channel.send("Your reason can't be longer than 512 characters!");
			spaghettifier();
        }
		const banDays = parseInt(args[1]);
		if (message.member.hasPermission('BAN_MEMBERS')) {
			if (!message.mentions.users.size) { message.reply('you need to specify who to ban!'); }
			else {
				const confirmation = new Discord.MessageEmbed();
				confirmation.setTitle('Ban')
				confirmation.setAuthor('Howdy', client.user.displayAvatarURL({ format: "png", dynamic: true }))
				confirmation.setColor(randomColor)
				confirmation.setImage(victim.user.displayAvatarURL({ format: "png", dynamic: true }))
				if (victim.bannable) {
					if (banReason === charCheck.check) { }
					else if (!banReason && banDays) {
						victim.ban({ days: banDays });
						confirmation.setDescription(`${victim} has been banned by ${message.author} and their messages over the last ${banDays} have been deleted.`)
						message.channel.send(message.author.toString(), confirmation);
					}
					else if (banReason && banDays) {
						victim.ban({ days: banDays, reason: banReason });
						confirmation.setDescription(`${victim} has been banned by ${message.author} and their messages over the last ${banDays} have been deleted because:\n${banReason}`)
						message.channel.send(message.author.toString(), confirmation);
					}
					else { message.reply('You need to provide an amount of days to delete messages!'); }
				} else if (!victim.bannable) { message.channel.send('I can\'t ban this person!'); }
				else { message.channel.send('error'); }
			}
		}
		else { message.reply(`you don't have the necessary permissions to do this!`); }

	}
	/* else if (command === 'poll' || command === 'vote') {
		function createNewDesc(addition) {
			var newDesc;
			newDesc += addition;
			return newDesc;
		}
		function newPoll(newVar, comparison) {
			for (i = newVar; i > comparison; i++) {
				console.log('does this run?');
				createNewDesc(`${emojis[i]} ${newArgs[i]}\n`);
				console.log(newDesc);
				return newDesc;
			}
		}
		const newArgsString = args.join(' ');
		const newArgs = newArgsString.split('"')
		console.log(newArgs);
		var ii = newArgs.length;
		while (ii--) {
			ii % 2 === 0 && newArgs.splice(ii, 1);
		}
		const question = newArgs[0];
		console.log(newArgs);
		const booth = new Discord.MessageEmbed();
		booth.setAuthor = ('Howdy', client.user.displayAvatarURL({ format: "png", dynamic: true }))
		booth.setTitle(`📊 ${question}`);
		if (newArgs.length == 1) {
			console.log('this is running');
			booth.setDescription('React with yes or no.')
			message.channel.send(booth).then(booththen => {
				booththen.react('👍');
				booththen.react('👎');
			})
		}
		else if (newArgs.length >= 21) {
			message.channel.send('You can only have 26 options!');
		}
		else {
			console.log('whats running');
			console.log(`it skipped`);
			booth.setDescription(newPoll(1, newArgs.length));
			message.channel.send(booth).then(booththen => {
				for (i = newArgs.length; i < 1; i++) {
					booththen.react(emojis[i]);
					console.log('this worked');
				}
			});
		}
	} */
	else if (command === 'fortune' || command === 'eightball' || command === '8ball') {
		function newResult() { return getRandomInt(19); }
		console.log(newResult());
		const resultList = [
			'It is certain.', 'It is decidedly so.', 'Without a doubt.', 'Yes – definitely.', 'You may rely on it', 'As I see it, yes.',
			'Most likely.', 'Outlook good.', 'Yes.', 'Signs point to yes.', 'Reply hazy, try again.', 'Ask again later.',
			'Better not tell you now.', 'Cannot predict now.', 'Concentrate and ask again.', "Don't count on it.", 'My reply is no.',
			'My sources say no.', 'Outlook not so good.', 'Very doubtful.'];
		message.channel.send(resultList[newResult()]);
    }

});
client.login(token);