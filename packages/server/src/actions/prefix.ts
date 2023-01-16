import { SocketAction } from "server";

export const prefix: SocketAction<"prefix", "server"> = {
    name: "prefix",
    onEvent(socket, data) {
        console.log(`server: prefix : `, data)
        socket.broadcast.emit("prefix", data);
    },
    emit: (socket) => {

    }
}

