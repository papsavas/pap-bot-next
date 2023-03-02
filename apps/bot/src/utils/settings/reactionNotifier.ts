import { Client, User } from "discord.js";
import { guildReactionNotifiers } from "../..";

export const updateCachedReactionNotifiers = async (
    client: Client, guilds: string[],
    userId: User['id'], targetId?: User['id'] | null
) => {
    const guildIds = guilds.length === 0 ?
        //for all guilds
        [...client.guilds.cache.filter(async g => (await g.members.fetch()).has(userId)).keys()] :
        guilds
    for (const guildId of guildIds) {
        const g = guildReactionNotifiers.get(guildId);
        guildReactionNotifiers.set(guildId, {
            users: [...g?.users.values() ?? [], userId],
            targetId: targetId ?? g?.targetId
        })
    }

}