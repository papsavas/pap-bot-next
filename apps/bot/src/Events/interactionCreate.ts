import { makeEvent } from "../utils/makeEvent"

export const interactionCreate = makeEvent({
    event: "interactionCreate",
    async execute(socket, interaction) {
        return Promise.reject(`${name} has no execution implemented`)
    }
})