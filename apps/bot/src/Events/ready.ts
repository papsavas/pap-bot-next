import { makeEvent } from "../Utils/makeDiscordEvent"

export const ready = makeEvent({
    name: "ready",
    async execute(client) {
        console.log(`Bot cache ready. Serving ${client.guilds.cache.size} servers`)
    },
})