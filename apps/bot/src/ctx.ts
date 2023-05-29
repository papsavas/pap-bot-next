import { Collection, Snowflake } from 'discord.js';
import { MonitoredCollection } from 'utils';
import { Context, GuildPrefix, ReactionNotifier } from '../types/Context';
import Command from './lib/commands/Command';
import { prefixMonitors } from './monitors/prefix';
import { reactionNotifierMonitors } from './monitors/reactionNotifier';

export const ctx: Context = {
	commands: new Collection<string, Command>(),
	prefix: new MonitoredCollection<Snowflake, GuildPrefix>(
		undefined,
		prefixMonitors
	),
	reactionNotifier: new MonitoredCollection<Snowflake, ReactionNotifier>(
		undefined,
		reactionNotifierMonitors
	),
};
