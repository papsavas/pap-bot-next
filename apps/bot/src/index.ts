import { Client, ClientEvents, Events, Partials } from 'discord.js';
import dotenv from 'dotenv';
import findConfig from 'find-config';
import { importDir } from 'utils';
import { DiscordEvent } from '../types/DiscordEvent';

dotenv.config({ path: findConfig('.env')! });

export const bot = new Client({
	intents: [
		'Guilds',
		'DirectMessages',
		'MessageContent',
		'GuildMessages',
		'GuildMembers',
		'GuildMessages',
		'GuildMessageReactions',
	],
	partials: [
		Partials.Message,
		Partials.User,
		Partials.Channel,
		Partials.Reaction,
	],
});

const eventFiles = importDir<DiscordEvent<keyof ClientEvents>>({
	path: 'src/events',
	filter: (file) => {
		const [name, postfix] = file.split('.');
		const isTypescriptFile = postfix === 'ts';
		const isNamedDiscordEvent = Object.values<string>(Events).includes(name);
		return isTypescriptFile && isNamedDiscordEvent;
	},
	throwOnMiss: true,
});

eventFiles.then((events) => {
	for (const ev of events.values())
		bot.on(ev.event, async (...args) => {
			ev.execute(...args);
		});
});

bot.login(process.env.DISCORD_BOT_TOKEN).then((_) => console.log('Logged in'));

//catch unhandled rejections
process.on('unhandledRejection', (reason, p) => {
	console.log(`Unhandled Rejection: ${reason}`);
});
