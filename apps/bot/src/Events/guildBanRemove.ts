import { makeEvent } from "../Utils/makeDiscordEvent"

export const guildBanRemove = makeEvent({
    name: "guildBanRemove",
    async execute(ban) {
        return Promise.reject(`${name} has no execution implemented`)
    },
})