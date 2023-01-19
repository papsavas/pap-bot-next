import { makeEvent } from "../utils/makeEvent"

export default makeEvent({
    event: "messageReactionRemove",
    async execute(socket, reaction, user) {
        return Promise.reject(`method has no execution implemented`)
    },
})