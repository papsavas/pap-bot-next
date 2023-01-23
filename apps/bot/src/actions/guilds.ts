import { makeClientAction } from "server";
import { bot } from "..";

export const guilds = makeClientAction({
    action: "guilds",
    async onEvent(socket, data) {
        data.guilds = bot.guilds.cache;
        return { socket, data }
    },
    async emit(socket, data) {
        socket.emit("guilds", data);
        return { socket, data }
    },
})