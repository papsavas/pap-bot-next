import { Client, ClientOptions, Partials } from 'discord.js';
import dotenv from 'dotenv';
import findConfig from 'find-config';
dotenv.config({ path: findConfig('.env')! });

//mockup client

export default (
	intents: ClientOptions['intents'] = [
		'Guilds',
		'DirectMessages',
		'MessageContent',
		'GuildMessages',
	],
	partials: ClientOptions['partials'] = [
		Partials.Message,
		Partials.User,
		Partials.Channel,
	]
) => {
	const bot = new Client({ intents, partials });
	return bot.login(process.env.DISCORD_BOT_TOKEN).then(() => bot);
};
