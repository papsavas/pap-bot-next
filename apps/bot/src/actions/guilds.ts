import { makeClientAction } from "server";

export const guilds = makeClientAction({
    action: "guilds",
    async onEvent(socket, data) {
        return { socket, data }
    },
    async emit(socket, data) {
        socket.emit("guilds", data);
        return { socket, data }
    },
})