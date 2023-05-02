import { Guild, Role, User } from "discord.js";
import { MonitoredCollection } from "utils";
import { Command } from "./Command";

type GuildPrefix = {
    prefix: string,
    userId: Role['id']
}

type ReactionNotifier = {
    userId: User['id']
    targetId: User['id'] | Role['id']
    guildId: Guild['id']
}

type Context = {
    commands: Command[],
    prefix: MonitoredCollection<Guild['id'], GuildPrefix>,
    reactionNotifier: MonitoredCollection<string, ReactionNotifier>
}