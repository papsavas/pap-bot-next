import { makeEvent } from "../utils/events/makeEvent";

const guildBanRemove = makeEvent({
    event: "guildBanRemove",
    async execute(ban) {
        console.log(`unbanned ${ban.user.tag} in ${ban.guild.name}`)
    },
})

export default guildBanRemove;