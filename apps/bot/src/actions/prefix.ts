import { makeClientAction } from "server"

export const prefix = makeClientAction({
    name: "prefix",
    onEvent(socket, data) {
        console.log(`bot: recv prefix : `, data)
    },
    emit: (socket) => {
        socket.emit("prefix", { guildId: "bot_guild_id", prefix: "bot_new_prefix" })
    }
})

