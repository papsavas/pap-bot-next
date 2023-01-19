import { makeClientAction } from "server";

export const poll = makeClientAction({
    action: "poll",
    async onEvent(socket, data) {
        return { socket, data }
    },
    async emit(socket, data) {
        return { socket, data }
    },
})