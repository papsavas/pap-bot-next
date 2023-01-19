import { makeEvent } from "../utils/makeEvent"

export const messageReactionAdd = makeEvent({
    name: "messageReactionAdd",
    async execute(socket, reaction, user) {
        return Promise.reject(`${name} has no execution implemented`)
    },
})