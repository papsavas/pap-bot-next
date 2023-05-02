import { db } from "database";
import { Snowflake } from "discord.js";
import { Monitors } from "utils";
import { ReactionNotifier } from "../../types/Context";

export const reactionNotifierMonitors: Monitors<Snowflake, ReactionNotifier> = {
    set(id, { guildId, targetId, userId }) {
        db.reactionNotifications.upsert({
            where: { userId_guildId_targetId: { guildId, targetId, userId } },
            create: { userId, targetId, guildId },
            update: { userId, targetId, guildId, }
        }).then(({ userId, targetId, guildId }) =>
            console.log(`upserted ${userId} to be notified for guild:${guildId} and target:${targetId}`)
        )
    },
}