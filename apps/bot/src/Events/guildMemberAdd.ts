import { makeEvent } from "../utils/events/makeEvent";

const guildMemberAdd = makeEvent({
    event: "guildMemberAdd",
    async execute(socket, member) {
        return Promise.reject(`method has no execution implemented`)
    },
})

export default guildMemberAdd;