import { makeEvent } from "../utils/events/makeEvent";

const guildUnavailable = makeEvent({
    event: "guildUnavailable",
    async execute(socket, guild) {
        return console.log(`guild ${guild.name} is unavailable`)
    },
})

export default guildUnavailable;