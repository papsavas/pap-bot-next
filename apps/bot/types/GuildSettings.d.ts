import { Collection, Role, Snowflake, User } from "discord.js";
import { Command } from "./Command";

export type GuildPrefix = {
    value: string,
    userId: Role['id']
}
export type GuildReactionNotifier = {
    users: User['id'][],
    targetId?: User['id']
}

export type GuildCache = {
    commands: Command[],
    prefix: Collection<Snowflake, GuildPrefix>,
    reactionNotifier: Collection<Snowflake, GuildReactionNotifier>
}