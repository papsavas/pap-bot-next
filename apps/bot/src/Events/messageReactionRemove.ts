import { makeEvent } from "../utils/makeEvent"

export const messageReactionRemove = makeEvent({
    event: "messageReactionRemove",
    async execute(socket, reaction, user) {
        return Promise.reject(`${name} has no execution implemented`)
    },
})