import { Guild as DiscordGuild } from 'discord.js';
import { ToJSON } from 'types';
import { assertType, it } from 'vitest';
import { Guild, guildObject } from '../Guild';

it('JSON Discord Guild', () => {
	assertType<ToJSON<Pick<DiscordGuild, keyof Guild>>>(guildObject._type);
});
