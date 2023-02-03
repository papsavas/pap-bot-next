import { makeClientAction } from "server";

export const poll = makeClientAction({
    action: "poll",
    async onEvent(socket, data) {
        //TODO: send poll
        return { socket, data }
    }

})