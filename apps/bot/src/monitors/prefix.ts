import { db } from "database";
import { Snowflake } from "discord.js";
import { Monitors } from "utils";
import { GuildPrefix } from "../../types/Context";

export const prefixMonitors: Monitors<Snowflake, GuildPrefix> = {
    set(key, value) {
        db.prefix.upsert({
            where: { guildId: key },
            create: { ...value, guildId: key },
            update: { ...value }
        }).then(({ guildId, prefix, userId }) =>
            console.log(`stored prefix ${prefix} for ${guildId} from ${userId}`)
        )
    },
}