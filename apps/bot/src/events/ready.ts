import { Client } from "discord.js";
import { dirname, join } from "node:path";
import { fileURLToPath } from 'node:url';
import { db, importDir } from "server";
import { cache } from "..";
import { updateCachedReactionNotifiers } from "../handlers/reactionNotifications";
import { Command } from "../types/Command";
import { makeEvent } from "../utils/events/makeEvent";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const commands = importDir<Command>(join(__dirname, "..", "commands"), (f) => f.endsWith(".ts"));

const ready = makeEvent({
    event: "ready",
    async execute(client) {
        await loadReactionNotifiers(client);
        await loadPrefixes();
        cache.commands = await Promise.all(commands);
        console.log(`Bot cache ready. Serving ${client.guilds.cache.size} guilds`)
        socket.emit("guilds", { guilds: client.guilds.cache });
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
    for (const { guildId, userId, value } of prefixes)
        cache.prefix.set(guildId, { value, userId })
}

export default ready;

