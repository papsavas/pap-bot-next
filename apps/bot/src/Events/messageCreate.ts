import { makeEvent } from "../utils/makeEvent"

export const messageCreate = makeEvent({
    event: "messageCreate",
    async execute(socket, message) {
        return Promise.reject(`${name} has no execution implemented`)
    }
})