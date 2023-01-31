import { makeEvent } from "../utils/events/makeEvent";

const messageReactionAdd = makeEvent({
    event: "messageReactionAdd",
    async execute(socket, reaction, user) {
        return Promise.reject(`method has no execution implemented`)
    },
})

export default messageReactionAdd;