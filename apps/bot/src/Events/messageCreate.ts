import { makeEvent } from "./makeEvent"

export const message = makeEvent({
    name: "messageCreate",
    async execute(message) {
        return Promise.reject(`${name} has no execution implemented`)
    }
})