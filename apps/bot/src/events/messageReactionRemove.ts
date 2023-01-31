import { makeEvent } from "../utils/events/makeEvent";

const messageReactionRemove = makeEvent({
    event: "messageReactionRemove",
    async execute(socket, reaction, user) {
        return Promise.reject(`method has no execution implemented`)
    },
})

export default messageReactionRemove;