import { Client } from "discord.js";
import { prisma } from "server";
import { cache } from "..";
import { updateCachedReactionNotifiers } from "../handlers/reactionNotifications";
import { makeEvent } from "../utils/events/makeEvent";

const ready = makeEvent({
    event: "ready",
    async execute(socket, client) {
        await loadReactionNotifiers(client);
        await loadPrefixes();
        console.log(`Bot cache ready. Serving ${client.guilds.cache.size} guilds`)
        socket.emit("guilds", { guilds: client.guilds.cache });
    },
})

const loadReactionNotifiers = async (client: Client) => {
    const reactionNotifiers = await prisma.reactionNotifications.findMany();
    for (const { guilds, userId, targetId } of reactionNotifiers) {
        await updateCachedReactionNotifiers(client, guilds, userId, targetId);
    }
}

const loadPrefixes = async () => {
    const prefixes = await prisma.prefix.findMany();
    for (const { guildId, userId, value } of prefixes)
        cache.prefix.set(guildId, { value, userId })
}

export default ready;

