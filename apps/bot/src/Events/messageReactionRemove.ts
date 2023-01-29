import { makeEvent } from "../utils/events/makeEvent"

export default makeEvent({
    event: "messageReactionRemove",
    async execute(socket, reaction, user) {
        return Promise.reject(`method has no execution implemented`)
    },
})