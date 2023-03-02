import { Client, User } from "discord.js";
import { guildReactionNotifiers } from "../..";

export const updateCachedReactionNotifiers = async (client: Client, guilds: string[], userId: User['id']) => {
    const guildIds = guilds.length === 0 ?
        //for all guilds
        [...client.guilds.cache.filter(async g => (await g.members.fetch()).has(userId)).keys()] :
        guilds
    for (const guildId of guildIds)
        guildReactionNotifiers.set(guildId, [...guildReactionNotifiers.get(guildId)?.values() ?? [], userId])
}