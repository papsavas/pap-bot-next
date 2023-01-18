import { makeEvent } from "./makeEvent"

export const messageReactionAdd = makeEvent({
    name: "messageReactionAdd",
    async execute(reaction, user) {
        return Promise.reject(`${name} has no execution implemented`)
    },
})