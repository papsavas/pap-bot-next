import { makeEvent } from "../Utils/makeDiscordEvent"

export const messageDelete = makeEvent({
    name: "messageDelete",
    async execute(message) {
        return Promise.reject(`${name} has no execution implemented`)
    },
})