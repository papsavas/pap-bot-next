import { makeEvent } from "../utils/events/makeEvent";

const guildDelete = makeEvent({
    event: "guildDelete",
    async execute(socket, guild) {
        socket.emit("guilds", { guilds: guild.client.guilds.cache })
    },
})

export default guildDelete;