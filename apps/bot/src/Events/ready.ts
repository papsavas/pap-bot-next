import { guilds } from "../actions/guilds"
import { makeEvent } from "../utils/makeEvent"

export const ready = makeEvent({
    event: "ready",
    async execute(socket, client) {
        console.log(`Bot cache ready. Serving ${client.guilds.cache.size} servers`)

        guilds.emit(socket,
            [
                ...client.guilds.cache.mapValues(({ name, id, icon }) =>
                ({
                    name,
                    id,
                    iconUrl: icon
                })).values()
            ]
        )
    },
})