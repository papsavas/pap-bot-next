import { makeEvent } from "../utils/makeEvent";

const guildMemberRemove = makeEvent({
    event: "guildMemberRemove",
    async execute(member) {
        console.log(`member ${member.user.tag} left ${member.guild.name}`);
    },
})

export default guildMemberRemove;