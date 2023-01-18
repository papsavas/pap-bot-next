import { makeEvent } from "../Utils/makeDiscordEvent"

export const guildMemberUpdate = makeEvent({
    name: "guildMemberUpdate",
    async execute(oldMember, newMember) {
        return Promise.reject(`${name} has no execution implemented`)
    },
})