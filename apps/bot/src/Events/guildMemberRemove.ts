import { makeEvent } from "../utils/makeEvent"

export const guildMemberRemove = makeEvent({
    name: "guildBanRemove",
    async execute(guildMemberRemove) {
        return Promise.reject(`${name} has no execution implemented`)
    },
})