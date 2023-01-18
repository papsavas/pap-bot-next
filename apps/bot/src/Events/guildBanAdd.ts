import { makeEvent } from "../Utils/makeDiscordEvent";


export const guildBanAdd = makeEvent({
    name: "guildBanAdd",
    async execute(ban) {
        return Promise.reject(`${name} has no execution implemented`)
    },
})
