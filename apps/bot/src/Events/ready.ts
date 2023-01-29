import { guilds } from "../actions/guilds"
import { makeEvent } from "../utils/events/makeEvent"

export default makeEvent({
    event: "ready",
    async execute(socket, client) {
        console.log(`Bot cache ready. Serving ${client.guilds.cache.size} servers`)
        guilds.emit(socket, { guilds: client.guilds.cache })
    },
})