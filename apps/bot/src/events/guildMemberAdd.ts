import { makeEvent } from "../utils/events/makeEvent";

const guildMemberAdd = makeEvent({
    event: "guildMemberAdd",
    async execute(socket, member) {
        console.log(`member ${member.user.tag} joined ${member.guild.name}`);
    },
})

export default guildMemberAdd;