import { makeEvent } from "../utils/events/makeEvent";

const messageReactionRemove = makeEvent({
    event: "messageReactionRemove",
    async execute(socket, reaction, user) {

    },
})

export default messageReactionRemove;