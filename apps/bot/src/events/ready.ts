import { prisma } from "server";
import { guildSettings } from "..";
import { makeEvent } from "../utils/events/makeEvent";

const ready = makeEvent({
    event: "ready",
    async execute(socket, client) {
        console.log(`Bot cache ready. Serving ${client.guilds.cache.size} guilds`)
        await loadPrefixes();
        socket.emit("guilds", { guilds: client.guilds.cache });
    },
})

const loadPrefixes = async () => {
    const prefixes = await prisma.prefix.findMany();
    for (const { guildId, userId, value } of prefixes)
        guildSettings.set(guildId, {
            prefix: {
                value,
                userId
            }
        })
}

export default ready;