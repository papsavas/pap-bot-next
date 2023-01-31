import { guilds } from "../actions/guilds";
import { makeEvent } from "../utils/events/makeEvent";

const guildCreate = makeEvent({
    event: "guildCreate",
    async execute(socket, guild) {
        guilds.emit(socket, { guilds: guild.client.guilds.cache })
    },
})

export default guildCreate;