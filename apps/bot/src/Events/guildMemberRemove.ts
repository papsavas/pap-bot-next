import { makeEvent } from "../utils/makeEvent"

export const guildMemberRemove = makeEvent({
    event: "guildBanRemove",
    async execute(socket, guildMemberRemove) {
        return Promise.reject(`${name} has no execution implemented`)
    },
})