import { makeEvent } from "../utils/events/makeEvent"

export default makeEvent({
    event: "guildDelete",
    async execute(socket, guild) {
        return Promise.reject(`method has no execution implemented`)
    },
})