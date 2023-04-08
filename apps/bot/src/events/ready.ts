import { db } from "database";
import { Client } from "discord.js";
import { BOT_PORT } from "http-contract";
import { dirname, join } from "node:path";
import { fileURLToPath } from 'node:url';
import { importDir, values } from "utils";
import { ctx } from "..";
import { Command } from "../../types/Command";
import { app } from "../server";
import { makeEvent } from "../utils/makeEvent";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const commands = importDir<Command>(join(__dirname, "..", "commands"), (f) => f.endsWith(".ts"));

const ready = makeEvent({
    event: "ready",
    async execute(client) {
        await syncGuilds(client);
        await loadReactionNotifiers();
        await loadPrefixes();
        ctx.commands = await Promise.all(commands);
        //launch server
        app.listen(BOT_PORT, () => console.log(`bot server listening to ${BOT_PORT}`));
        console.log(`Bot cache ready. Serving ${client.guilds.cache.size} guilds`)
    },
})

const loadReactionNotifiers = async () => {
    const reactionNotifiers = await db.reactionNotifications.findMany();
    for (const { guilds, userId, targetId } of reactionNotifiers) {
        ctx.reactionNotifier.set(userId, { targetId, guilds })
    }
}

const loadPrefixes = async () => {
    const prefixes = await db.prefix.findMany();
    for (const { guildId, userId, prefix } of prefixes)
        ctx.prefix.set(guildId, { prefix, userId })
}

const syncGuilds = async (client: Client) =>
    Promise.all(
        client.guilds.cache.map(g => db.guild.upsert({
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

