import { REST } from '@discordjs/rest';
import { APIUser, Routes } from 'discord-api-types/v10';
import { describe, expect, it } from 'vitest';

describe('Bot User', () => {
	const token = process.env.DISCORD_BOT_TOKEN;

	it('should have defined token', () => {
		expect(token).not.toBeUndefined();
	});

	it.skipIf(!token)('should have registered bot user', async () => {
		const rest = new REST({ version: '10' }).setToken(token!);
		const { bot, id, username } = (await rest.get(Routes.user())) as APIUser;
		expect(bot).toBe(true);
		expect([
			process.env.DISCORD_BOT_ID,
			process.env.DISCORD_DEV_BOT_ID,
		]).includes(id);
		expect(username).toMatch(/PAP/);
	});
});
