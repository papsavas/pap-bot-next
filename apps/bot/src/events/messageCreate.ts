import { makeEvent } from "../lib/makeEvent";

const messageCreate = makeEvent({
    event: "messageCreate",
    async execute(message) {
    }
})

export default messageCreate;