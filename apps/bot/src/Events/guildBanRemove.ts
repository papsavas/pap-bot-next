import { makeEvent } from "../utils/events/makeEvent";

const guildBanRemove = makeEvent({
    event: "guildBanRemove",
    async execute(socket, ban) {
        return Promise.reject(`method has no execution implemented`)
    },
})

export default guildBanRemove;