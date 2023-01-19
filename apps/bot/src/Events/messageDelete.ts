import { makeEvent } from "../utils/makeEvent"

export const messageDelete = makeEvent({
    event: "messageDelete",
    async execute(socket, message) {
        return Promise.reject(`${name} has no execution implemented`)
    },
})