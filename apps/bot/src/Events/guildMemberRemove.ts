import { makeEvent } from "../utils/events/makeEvent";

const guildMemberRemove = makeEvent({
    event: "guildBanRemove",
    async execute(socket, guildMemberRemove) {
        return Promise.reject(`method has no execution implemented`)
    },
})

export default guildMemberRemove;