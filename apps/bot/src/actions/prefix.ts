import { SocketAction } from "server"

export const prefix: SocketAction<"prefix"> = {
    name: "prefix",
    onEvent(data) {
        console.log(`prefix recv to client event, ${data}`)
    },
    emit: () => {

    }
}

