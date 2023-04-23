import { db } from "database";
import { Snowflake } from "discord.js";
import { Monitors } from "utils";
import { ReactionNotifier } from "../../types/Context";

export const reactionNotifierMonitors: Monitors<Snowflake, ReactionNotifier> = {
    set(userId, { guilds, targetId }) {
        db.reactionNotifications.upsert({
            where: { userId },
            create: { userId, targetId, guilds },
            update: { guilds, targetId }
        }).then(({ userId, targetId, guilds }) =>
            console.log(`upserted ${userId} to be notified for guilds:${guilds.toString()} and target:${targetId}`)
        )
    },
}