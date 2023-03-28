import { makeEvent } from "../utils/events/makeEvent";

const messageCreate = makeEvent({
    event: "messageCreate",
    async execute(message) {
    }
})

export default messageCreate;