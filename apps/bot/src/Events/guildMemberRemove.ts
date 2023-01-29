import { makeEvent } from "../utils/events/makeEvent"

export default makeEvent({
    event: "guildBanRemove",
    async execute(socket, guildMemberRemove) {
        return Promise.reject(`method has no execution implemented`)
    },
})