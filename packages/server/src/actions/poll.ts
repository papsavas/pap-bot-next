import { makeServerAction } from "../utils/makeAction";

export const poll = makeServerAction({
    action: "poll",
    async onEvent(socket, data) {
        return { socket, data }
    },
    async emit(socket, data) {
        return { socket, data }
    },
})