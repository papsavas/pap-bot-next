import { makeEvent } from "../utils/events/makeEvent";

const messageCreate = makeEvent({
    event: "messageCreate",
    async execute(message) {
        socket.emit("message", { message });
    }
})

export default messageCreate;