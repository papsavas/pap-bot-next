import { makeEvent } from "../utils/makeEvent";


export const guildBanAdd = makeEvent({
    event: "guildBanAdd",
    async execute(socket, ban) {
        return Promise.reject(`${name} has no execution implemented`)
    },
})