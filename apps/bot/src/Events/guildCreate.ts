import { makeEvent } from "../Utils/makeDiscordEvent"

export const guildCreate = makeEvent({
    name: "guildCreate",
    async execute(guild) {
        return Promise.reject(`${name} has no execution implemented`)
    },
})