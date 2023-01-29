import { makeEvent } from "../utils/events/makeEvent";


const guildBanAdd = makeEvent({
    event: "guildBanAdd",
    async execute(socket, ban) {
        return Promise.reject(`method has no execution implemented`)
    },
})

export default guildBanAdd;