import { makeEvent } from "../utils/events/makeEvent";

const guildCreate = makeEvent({
    event: "guildCreate",
    async execute(socket, guild) {
        socket.emit("guilds", { guilds: guild.client.guilds.cache })
    },
})

export default guildCreate;