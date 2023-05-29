import { deleteGuild } from 'database';
import { makeEvent } from '../lib/makeEvent';

const guildDelete = makeEvent({
	event: 'guildDelete',
	async execute(guild) {
		console.log(`left ${guild.name} guild`);
		await deleteGuild({ where: { id: guild.id }, include: { prefix: true } });
	},
});

export default guildDelete;
