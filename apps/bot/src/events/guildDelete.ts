import { makeEvent } from "../utils/events/makeEvent";

const guildDelete = makeEvent({
    event: "guildDelete",
    async execute(guild) {
        console.log(`left ${guild.name} guild`)
        socket.emit("guilds", { guilds: guild.client.guilds.cache })
    },
})

export default guildDelete;