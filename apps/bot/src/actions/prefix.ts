import { SocketAction } from "server"

export const prefix: SocketAction<"prefix", "client"> = {
    name: "prefix",
    onEvent(socket, data) {
        console.log(`bot: recv prefix : `, data)
    },
    emit: (socket) => {
        socket.emit("prefix", { guildId: "bot_guild_id", prefix: "bot_new_prefix" })
    }
}

