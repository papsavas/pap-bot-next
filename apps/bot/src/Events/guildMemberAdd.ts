import { makeEvent } from "../Utils/makeDiscordEvent"

export const guildMemberAdd = makeEvent({
    name: "guildMemberAdd",
    async execute(member) {
        return Promise.reject(`${name} has no execution implemented`)
    },
})