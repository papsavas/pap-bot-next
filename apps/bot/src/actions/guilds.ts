import { makeClientAction } from "server";

export const guilds = makeClientAction({
    name: "guilds",
    onEvent(socket, data) {

    },
    emit(socket, guilds) {
        socket.emit("guilds", guilds);
    },
})