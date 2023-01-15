import { SocketAction } from "server"

export const poll: SocketAction<"poll", "client"> = {
    name: "poll",
    onEvent(socket, data) {
        console.log(`poll recv to client event, ${data}`)
    },
    emit: (socket) => {

    }
}