import { makeEvent } from "../Utils/makeDiscordEvent"

export const guildMemberRemove = makeEvent({
    name: "guildBanRemove",
    async execute(guildMemberRemove) {
        return Promise.reject(`${name} has no execution implemented`)
    },
})