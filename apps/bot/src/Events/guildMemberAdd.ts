import { makeEvent } from "./makeEvent"

export const guildMemberAdd = makeEvent({
    name: "guildMemberAdd",
    async execute(member) {
        return Promise.reject(`${name} has no execution implemented`)
    },
})