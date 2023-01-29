import { guilds } from "../actions/guilds";
import { makeEvent } from "../utils/events/makeEvent";

const guildDelete = makeEvent({
    event: "guildDelete",
    async execute(socket, guild) {
        guilds.emit(socket, { guilds: guild.client.guilds.cache })
    },
})

export default guildDelete;