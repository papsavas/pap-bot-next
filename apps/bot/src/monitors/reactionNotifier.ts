import { db } from "database";
import { Snowflake } from "discord.js";
import { ReactionNotifier } from "../../types/GuildSettings";
import { Monitors } from "../utils/MonitoredCollection";

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