import { SocketAction } from "server"

export const prefix: SocketAction<"prefix", "client"> = {
    name: "prefix",
    onEvent(socket, data) {
        console.log(`prefix recv to client event, ${data}`)
    },
    emit: (socket) => {

    }
}

