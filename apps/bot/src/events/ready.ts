import { fetchPrefixes, fetchReactionNotifications, upsertGuild } from "database";
import { Client } from "discord.js";
import { BOT_PORT } from "http-contract";
import { importDir, values } from "utils";
import { ctx } from "..";
import { Command } from "../../types/Command";
import { createReactionNotificationsId } from "../handlers/reactionNotifications";
import { app } from "../server";
import { makeEvent } from "../utils/makeEvent";

const commandFiles = importDir<Command>({
    path: 'src/commands',
    filter: (f) => f.endsWith(".ts")
});

const ready = makeEvent({
    event: "ready",
    async execute(client) {
        await syncGuilds(client);
        await loadReactionNotifiers();
        await loadPrefixes();
        //load commands into context
        const cmds = (await commandFiles).values();
        for (const cmd of cmds)
            ctx.commands.set(cmd.name, cmd);
        //launch server
        app.listen(BOT_PORT, () => console.log(`bot server listening to ${BOT_PORT}`));
        console.log(`Bot cache ready. Serving ${client.guilds.cache.size} guilds`)
    },
})

const loadReactionNotifiers = async () => {
    const reactionNotifiers = await fetchReactionNotifications({});
    for (const { userId, targetId, guildId } of reactionNotifiers) {
        ctx.reactionNotifier.set(createReactionNotificationsId({ guildId, userId, targetId }), { targetId, guildId, userId })
    }
}

const loadPrefixes = async () => {
    const prefixes = await fetchPrefixes({});
    for (const { guildId, userId, prefix } of prefixes)
        ctx.prefix.set(guildId, { prefix, userId })
}

const syncGuilds = async (client: Client) =>
    Promise.all(
        client.guilds.cache.map(g => upsertGuild({
            where: { id: g.id },
            create: {
                id: g.id, name: g.name, icon: g.iconURL(), prefix: {
                    connectOrCreate: {
                        where: { guildId: g.id },
                        create: {
                            prefix: values.defaultPrefix,
                            userId: g.ownerId
                        }
                    }
                }
            }, update: {
                icon: g.iconURL(),
                name: g.name
            }
        }))
    )



export default ready;

