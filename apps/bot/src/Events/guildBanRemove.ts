import { makeEvent } from "../utils/makeEvent"

export default makeEvent({
    event: "guildBanRemove",
    async execute(socket, ban) {
        return Promise.reject(`method has no execution implemented`)
    },
})