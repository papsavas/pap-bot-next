import { makeEvent } from "../utils/makeEvent";


export default makeEvent({
    event: "guildBanAdd",
    async execute(socket, ban) {
        return Promise.reject(`method has no execution implemented`)
    },
})
