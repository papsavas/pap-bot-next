import { makeEvent } from "../utils/makeEvent"

export const guildUnavailable = makeEvent({
    event: "guildUnavailable",
    async execute(socket, guild) {
        return Promise.reject(`${name} has no execution implemented`)
    },
})