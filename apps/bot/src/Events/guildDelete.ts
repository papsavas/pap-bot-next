import { makeEvent } from "../utils/makeEvent"

export const guildDelete = makeEvent({
    name: "guildDelete",
    async execute(socket, guild) {
        return Promise.reject(`${name} has no execution implemented`)
    },
})