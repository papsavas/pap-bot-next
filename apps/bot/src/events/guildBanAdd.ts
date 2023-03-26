import { makeEvent } from "../utils/events/makeEvent";


const guildBanAdd = makeEvent({
    event: "guildBanAdd",
    async execute(socket, ban) {
        console.log(`banned ${ban.user.tag} in ${ban.guild.name}`)
    },
})

export default guildBanAdd;