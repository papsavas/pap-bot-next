import { guilds } from "../actions/guilds"
import { makeEvent } from "../utils/makeEvent"

export const ready = makeEvent({
    event: "ready",
    async execute(socket, client) {
        console.log(`Bot cache ready. Serving ${client.guilds.cache.size} servers`)

        guilds.emit(socket, [{ name: "testname", id: "test_id", iconUrl: null }]) //[...client.guilds.cache.mapValues(({ name, id, iconURL }) => ({ name, id, iconUrl: iconURL({ extension: "webp" }) })).values()])
    },
})