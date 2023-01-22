import { makeEvent } from "../utils/makeEvent";

export default makeEvent({
    event: "messageCreate",
    async execute(socket, message) {
        console.log(`${message.author.username}: ${message.content}`)
        socket.emit("message", { message });
    }
})