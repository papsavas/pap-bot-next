import { makeEvent } from "./makeEvent"

export const ready = makeEvent({
    name: "ready",
    async execute(client) {
        return Promise.reject(`${name} has no execution implemented`)
    },
})