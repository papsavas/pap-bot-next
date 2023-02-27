import { makeClientAction } from "server";
import { guildSettings } from "..";

export const prefix = makeClientAction({
    action: "prefix",
    async onEvent(socket, data) {
        //update cache
        guildSettings.set(data.guildId, { prefix: { userId: data.userId, value: data.value } })
        return { socket, data }
    }
})

