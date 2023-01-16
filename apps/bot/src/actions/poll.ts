import { SocketAction } from "server"

export const poll: SocketAction<"poll", "client"> = {
    name: "poll",
    onEvent(socket, data) {

    },
    emit: (socket) => {

    }
}