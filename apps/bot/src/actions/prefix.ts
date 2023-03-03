import { makeClientAction } from "server";
import { cache } from "..";


export const prefix = makeClientAction({
    action: "prefix",
    async onEvent(socket, data) {
        //update cache
        cache.prefix.set(data.guildId, { userId: data.userId, value: data.value })
        return { socket, data }
    }
})

