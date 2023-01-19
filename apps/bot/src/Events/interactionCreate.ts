import { makeEvent } from "../utils/makeEvent"

export default makeEvent({
    event: "interactionCreate",
    async execute(socket, interaction) {
        return Promise.reject(`method has no execution implemented`)
    }
})