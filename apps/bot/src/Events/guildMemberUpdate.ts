import { makeEvent } from "../utils/events/makeEvent"

export default makeEvent({
    event: "guildMemberUpdate",
    async execute(socket, oldMember, newMember) {
        return Promise.reject(`method has no execution implemented`)
    },
})