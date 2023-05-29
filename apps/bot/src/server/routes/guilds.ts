import { initServer } from '@ts-rest/express';
import {
	Guild as DiscordGuild,
	PermissionsBitField,
	Snowflake,
} from 'discord.js';
import { contract } from 'http-contract';
import { guildObject } from 'types';

const memberIsEligible = (g: DiscordGuild, memberId: Snowflake) =>
	g.members
		.fetch(memberId)
		.then((member) =>
			member.permissions.has(PermissionsBitField.Flags.ManageGuild, true)
		)
		.catch(() => false);

const s = initServer();
export const guildsRouter = s.router(contract.guilds, {
	getGuilds: async ({ req, query }) => {
		const guildCache = req.bot.guilds.cache.clone();
		const { memberId } = query;
		if (memberId)
			for (const [gid, g] of guildCache) {
				const eligible = await memberIsEligible(g, memberId);
				if (!eligible) guildCache.delete(gid);
			}

		const body = guildCache.toJSON().map((g) => guildObject.parse(g.toJSON()));
		return {
			status: 200,
			body,
		};
	},
	getGuild: async ({ req, params }) => {
		const guild = req.bot.guilds.cache.get(params.id);
		if (!guild)
			return { status: 400, body: { message: 'Guild does not exist' } };
		return {
			status: 200,
			body: guildObject.parse(guild.toJSON()),
		};
	},
});
