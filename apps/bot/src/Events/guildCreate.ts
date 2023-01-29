import { makeEvent } from "../utils/events/makeEvent";

const guildCreate = makeEvent({
    event: "guildCreate",
    async execute(socket, guild) {
        return Promise.reject(`method has no execution implemented`)
    },
})

export default guildCreate;