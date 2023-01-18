import { makeEvent } from "../utils/makeEvent"

export const guildUnavailable = makeEvent({
    name: "guildUnavailable",
    async execute(guild) {
        return Promise.reject(`${name} has no execution implemented`)
    },
})