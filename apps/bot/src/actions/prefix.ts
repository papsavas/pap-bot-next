import { makeClientAction } from "server";
import { guildPrefixes } from "..";

export const prefix = makeClientAction({
    action: "prefix",
    async onEvent(socket, data) {
        //update cache
        guildPrefixes.set(data.guildId, { userId: data.userId, value: data.value })
        return { socket, data }
    }
})

