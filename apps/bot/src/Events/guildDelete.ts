import { makeEvent } from "../utils/makeEvent"

export default makeEvent({
    event: "guildDelete",
    async execute(socket, guild) {
        return Promise.reject(`method has no execution implemented`)
    },
})