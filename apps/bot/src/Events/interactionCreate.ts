import { makeEvent } from "../utils/makeEvent"

export const interactionCreate = makeEvent({
    name: "interactionCreate",
    async execute(socket, interaction) {
        return Promise.reject(`${name} has no execution implemented`)
    }
})