import { makeEvent } from "../utils/events/makeEvent"

export default makeEvent({
    event: "guildMemberAdd",
    async execute(socket, member) {
        return Promise.reject(`method has no execution implemented`)
    },
})