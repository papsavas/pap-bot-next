import { makeEvent } from "../utils/makeEvent"

export default makeEvent({
    event: "guildMemberAdd",
    async execute(socket, member) {
        return Promise.reject(`method has no execution implemented`)
    },
})