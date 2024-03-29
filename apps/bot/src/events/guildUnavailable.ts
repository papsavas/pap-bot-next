import { makeEvent } from '../lib/makeEvent';

const guildUnavailable = makeEvent({
	event: 'guildUnavailable',
	async execute(guild) {
		console.log(`guild ${guild.name} is unavailable`);
	},
});

export default guildUnavailable;
