import { makeClientAction } from "server";

export const prefix = makeClientAction({
    action: "prefix",
    async onEvent(socket, data) {
        console.log(`bot: recv prefix : `, data)
        return { socket, data };
    },
    async emit(socket, data) {
        data = { guildId: "bot_guild_id", prefix: "bot_new_prefix" }
        socket.emit("prefix", data)
        return { socket, data }
    }
})

