import { makeClientAction } from "server";

export const message = makeClientAction({
    action: "message",
    async onEvent(socket, data) {
        return { socket, data }
    },
    async emit(socket, data) {
        return { socket, data }
    },
})