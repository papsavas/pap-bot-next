import { Collection, Snowflake } from 'discord.js';
import { PapMap } from 'papmap';
import { Context, GuildPrefix, ReactionNotifier } from '../types/Context';
import Command from './lib/commands/Command';
import { prefixMonitors } from './monitors/prefix';
import { reactionNotifierMonitors } from './monitors/reactionNotifier';

export const ctx: Context = {
	commands: new Collection<string, Command>(),
	prefix: new PapMap<Snowflake, GuildPrefix>(
		undefined,
		prefixMonitors
	),
	reactionNotifier: new PapMap<Snowflake, ReactionNotifier>(
		undefined,
		reactionNotifierMonitors
	),
};
