import { SocketAction } from "server"

export const prefix: SocketAction<"prefix", "server"> = {
    name: "prefix",
    onEvent(socket, data) {
        console.log(`prefix recv to client event, ${data}`)
    },
    emit: (socket) => {

    }
}

