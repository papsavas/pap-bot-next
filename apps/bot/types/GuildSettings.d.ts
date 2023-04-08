import { Guild, Role, User } from "discord.js";
import { MonitoredCollection } from "../src/utils/MonitoredCollection";
import { Command } from "./Command";

export type GuildPrefix = {
    prefix: string,
    userId: Role['id']
}
export type ReactionNotifier = {
    guilds: Guild['id'][],
    targetId?: User['id']
}

export type Cache = {
    commands: Command[],
    prefix: MonitoredCollection<Guild['id'], GuildPrefix>,
    reactionNotifier: MonitoredCollection<User['id'], ReactionNotifier>
}