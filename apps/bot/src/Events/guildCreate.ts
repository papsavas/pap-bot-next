import { makeEvent } from "../utils/makeEvent"

export default makeEvent({
    event: "guildCreate",
    async execute(socket, guild) {
        return Promise.reject(`method has no execution implemented`)
    },
})