import { makeClientAction } from "server";

export const prefix = makeClientAction({
    action: "prefix",
    async onEvent(socket, data) {
        console.log(`bot: recv prefix : `, data)
        return { socket, data };
    },
    async emit(socket, data) {
        socket.emit("prefix", data)
        return { socket, data }
    }
})

