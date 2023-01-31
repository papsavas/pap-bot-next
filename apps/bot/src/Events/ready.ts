import { guilds } from "../actions/guilds"
import { makeEvent } from "../utils/events/makeEvent"

const ready = makeEvent({
    event: "ready",
    async execute(socket, client) {
        console.log(`Bot cache ready. Serving ${client.guilds.cache.size} guilds`)
        guilds.emit(socket, { guilds: client.guilds.cache })
    },
})

export default ready;