import { makeEvent } from "../utils/makeEvent"

export const messageReactionRemove = makeEvent({
    name: "messageReactionRemove",
    async execute(reaction, user) {
        return Promise.reject(`${name} has no execution implemented`)
    },
})