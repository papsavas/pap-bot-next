import { Role, User } from "discord.js";

export type GuildPrefix = {
    value: string,
    userId: Role['id']
}
export type GuildReactionNotifiers = {
    users: User['id'][],
    targetId?: User['id']
}