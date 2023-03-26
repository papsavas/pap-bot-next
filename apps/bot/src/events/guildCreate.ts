import { makeEvent } from "../utils/events/makeEvent";

const guildCreate = makeEvent({
    event: "guildCreate",
    async execute(socket, guild) {
        console.log(`joined ${guild.name} guild`)
        socket.emit("guilds", { guilds: guild.client.guilds.cache })
    },
})

export default guildCreate;