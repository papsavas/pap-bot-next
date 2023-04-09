import { Guild, Role, User } from "discord.js";
import { MonitoredCollection } from "../src/utils/MonitoredCollection";
import { Command } from "./Command";

export type GuildPrefix = {
    prefix: string,
    userId: Role['id']
}

//TODO: support multiple targets
export type ReactionNotifier = {
    guilds: Guild['id'][],
    targetId: User['id'] | null
}

export type Context = {
    commands: Command[],
    prefix: MonitoredCollection<Guild['id'], GuildPrefix>,
    reactionNotifier: MonitoredCollection<User['id'], ReactionNotifier>
}