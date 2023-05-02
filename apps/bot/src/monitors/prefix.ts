import { upsertPrefix } from "database";
import { Snowflake } from "discord.js";
import { Monitors } from "utils";
import { GuildPrefix } from "../../types/Context";

export const prefixMonitors: Monitors<Snowflake, GuildPrefix> = {
    set(key, value) {
        upsertPrefix({
            where: { guildId: key },
            create: { ...value, guildId: key },
            update: { ...value }
        }).then(({ guildId, prefix, userId }) =>
            console.log(`stored prefix ${prefix} for ${guildId} from ${userId}`)
        )
    },
}