import { makeEvent } from "../utils/events/makeEvent"

export default makeEvent({
    event: "guildUnavailable",
    async execute(socket, guild) {
        return Promise.reject(`method has no execution implemented`)
    },
})