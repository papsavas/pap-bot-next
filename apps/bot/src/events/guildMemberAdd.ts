import { makeEvent } from "../lib/makeEvent";

const guildMemberAdd = makeEvent({
    event: "guildMemberAdd",
    async execute(member) {
        console.log(`member ${member.user.tag} joined ${member.guild.name}`);
    },
})

export default guildMemberAdd;