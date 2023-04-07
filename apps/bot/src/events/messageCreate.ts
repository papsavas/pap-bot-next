import { makeEvent } from "../utils/makeEvent";

const messageCreate = makeEvent({
    event: "messageCreate",
    async execute(message) {
    }
})

export default messageCreate;