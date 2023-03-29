import { makeEvent } from "../utils/events/makeEvent";

const messageReactionRemove = makeEvent({
    event: "messageReactionRemove",
    async execute(reaction, user) {

    },
})

export default messageReactionRemove;