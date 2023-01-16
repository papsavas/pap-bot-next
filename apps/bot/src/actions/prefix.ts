import { SocketAction } from "server"

export const prefix: SocketAction<"prefix", "client"> = {
    name: "prefix",
    onEvent(socket, data) {
        console.log(`client: prefix : `, data)
    },
    emit: (socket) => {
        socket.emit("prefix", { guildId: "test_guild_id", "prefix": "test_new_prefix" })
    }
}

