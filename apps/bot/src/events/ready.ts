import { db } from "database";
import { Client } from "discord.js";
import { dirname, join } from "node:path";
import { fileURLToPath } from 'node:url';
import { importDir, values } from "utils";
import { cache } from "..";
import { Command } from "../../types/Command";
import { updateCachedReactionNotifiers } from "../handlers/reactionNotifications";
import { BOT_PORT, server } from "../server";
import { makeEvent } from "../utils/events/makeEvent";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const commands = importDir<Command>(join(__dirname, "..", "commands"), (f) => f.endsWith(".ts"));

const ready = makeEvent({
    event: "ready",
    async execute(client) {
        await syncGuilds(client);
        await loadReactionNotifiers(client);
        await loadPrefixes();
        cache.commands = await Promise.all(commands);
        //attach arguments to server
        server.addHook("onRequest", (req, res, done) => {
            req.client = client;
            req.cache = cache
            done();
        });
        server.listen({ port: BOT_PORT }, () => console.log(`bot server listening to ${BOT_PORT}`));
        console.log(`Bot cache ready. Serving ${client.guilds.cache.size} guilds`)
    },
})

const loadReactionNotifiers = async (client: Client) => {
    const reactionNotifiers = await db.reactionNotifications.findMany();
    for (const { guilds, userId, targetId } of reactionNotifiers) {
        await updateCachedReactionNotifiers(client, guilds, userId, targetId);
    }
}

const loadPrefixes = async () => {
    const prefixes = await db.prefix.findMany();
    for (const { guildId, userId, prefix } of prefixes)
        cache.prefix.set(guildId, { prefix, userId })
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

