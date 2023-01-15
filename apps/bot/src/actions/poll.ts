import { SocketAction } from "server"

export const poll: SocketAction<"poll"> = {
    name: "poll",
    onEvent(data) {
        console.log(`poll recv to client event, ${data}`)
    },
    emit: () => {

    }
}