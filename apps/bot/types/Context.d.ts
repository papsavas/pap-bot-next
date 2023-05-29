import { Collection, Guild, Role, User } from 'discord.js';
import { MonitoredCollection } from 'utils';
import Command from '../src/lib/commands/Command';

type GuildPrefix = {
	prefix: string;
	userId: Role['id'];
};

type ReactionNotifier = {
	userId: User['id'];
	targetId: User['id'] | Role['id'];
	guildId: Guild['id'];
};

type Context = {
	commands: Collection<Command['name'], Command>;
	prefix: MonitoredCollection<Guild['id'], GuildPrefix>;
	reactionNotifier: MonitoredCollection<string, ReactionNotifier>;
};
