import { makeEvent } from "../utils/makeEvent"

export const guildMemberAdd = makeEvent({
    event: "guildMemberAdd",
    async execute(socket, member) {
        return Promise.reject(`${name} has no execution implemented`)
    },
})