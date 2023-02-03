import { makeClientAction } from "server";

export const guilds = makeClientAction({
    action: "guilds",
    async onEvent(socket, data) {
        return { socket, data }
    }
})