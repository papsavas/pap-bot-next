import { makeEvent } from "../utils/makeEvent"

export const guildMemberUpdate = makeEvent({
    event: "guildMemberUpdate",
    async execute(socket, oldMember, newMember) {
        return Promise.reject(`${name} has no execution implemented`)
    },
})