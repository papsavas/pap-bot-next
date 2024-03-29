import { makeEvent } from '../lib/makeEvent';

const guildBanAdd = makeEvent({
	event: 'guildBanAdd',
	async execute(ban) {
		console.log(`banned ${ban.user.tag} in ${ban.guild.name}`);
	},
});

export default guildBanAdd;
