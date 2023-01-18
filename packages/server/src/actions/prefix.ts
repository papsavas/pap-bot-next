import { SocketAction } from "server";

export const prefix: SocketAction<"prefix", "server"> = {
    name: "prefix",
    onEvent(socket, data) {
        console.log(`server: recv prefix : `, data)
        socket.broadcast.emit("prefix", data)
    },
    emit: (socket) => {
        socket.emit("prefix", { guildId: "server_guild_id", prefix: "server_new_prefix" })
    }
}

