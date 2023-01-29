import { makeEvent } from "../utils/events/makeEvent";

const guildDelete = makeEvent({
    event: "guildDelete",
    async execute(socket, guild) {
        return Promise.reject(`method has no execution implemented`)
    },
})

export default guildDelete;