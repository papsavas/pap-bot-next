import { makeClientAction } from "server";

export const guilds = makeClientAction({
    action: "guilds",
    onEvent(socket, data) {

    },
    emit(socket, guilds) {
        socket.emit("guilds", guilds);
    },
})