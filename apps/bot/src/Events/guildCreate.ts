import { makeEvent } from "../utils/makeEvent"

export const guildCreate = makeEvent({
    event: "guildCreate",
    async execute(socket, guild) {
        return Promise.reject(`${name} has no execution implemented`)
    },
})