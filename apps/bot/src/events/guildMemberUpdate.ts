import { makeEvent } from "../utils/events/makeEvent";

const guildMemberUpdate = makeEvent({
    event: "guildMemberUpdate",
    async execute(socket, oldMember, newMember) {
        return Promise.reject(`method has no execution implemented`)
    },
})

export default guildMemberUpdate;