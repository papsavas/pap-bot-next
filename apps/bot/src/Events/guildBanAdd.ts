import { makeEvent } from "../utils/makeEvent";


export const guildBanAdd = makeEvent({
    name: "guildBanAdd",
    async execute(ban) {
        return Promise.reject(`${name} has no execution implemented`)
    },
})
