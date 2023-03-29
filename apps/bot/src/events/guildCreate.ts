import { makeEvent } from "../utils/events/makeEvent";

const guildCreate = makeEvent({
    event: "guildCreate",
    async execute(guild) {
        console.log(`joined ${guild.name} guild`)
    },
})

export default guildCreate;