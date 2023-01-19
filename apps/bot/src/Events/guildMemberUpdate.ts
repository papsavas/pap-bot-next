import { makeEvent } from "../utils/makeEvent"

export default makeEvent({
    event: "guildMemberUpdate",
    async execute(socket, oldMember, newMember) {
        return Promise.reject(`method has no execution implemented`)
    },
})