import { makeEvent } from "../utils/makeEvent"

export const messageDelete = makeEvent({
    name: "messageDelete",
    async execute(socket, message) {
        return Promise.reject(`${name} has no execution implemented`)
    },
})