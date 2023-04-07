import { makeEvent } from "../utils/makeEvent";

const messageReactionRemove = makeEvent({
    event: "messageReactionRemove",
    async execute(reaction, user) {

    },
})

export default messageReactionRemove;