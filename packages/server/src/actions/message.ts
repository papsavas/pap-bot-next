import { makeServerAction } from "../utils/makeAction";

export default makeServerAction({
    action: "message",
    async onEvent(socket, data) {
        return { socket, data }
    },
    async emit(socket, data) {
        socket.broadcast.emit("message", data)
        return { socket, data }
    }
})

