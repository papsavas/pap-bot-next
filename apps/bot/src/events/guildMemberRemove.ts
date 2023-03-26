import { makeEvent } from "../utils/events/makeEvent";

const guildMemberRemove = makeEvent({
    event: "guildMemberRemove",
    async execute(socket, member) {
        console.log(`member ${member.user.tag} left ${member.guild.name}`);
    },
})

export default guildMemberRemove;