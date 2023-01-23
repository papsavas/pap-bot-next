import { makeServerAction } from "../utils/makeAction";

export default makeServerAction({
    action: "prefix",
    async onEvent(socket, data) {
        console.log(`server: recv prefix : `, data)
        return { socket, data }
    },
    async emit(socket, data) {
        data = { guildId: "server_guild_id", prefix: "server_new_prefix" }
        socket.emit("prefix", data)
        return { socket, data }
    }
})

