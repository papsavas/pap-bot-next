import { Role, User } from "discord.js";

export type GuildPrefix = {
    value: string,
    userId: Role['id']
}
export type GuildReactionNotifiers = User['id'][]