import { makeEvent } from "../utils/events/makeEvent";

const guildMemberUpdate = makeEvent({
    event: "guildMemberUpdate",
    async execute(oldMember, newMember) {
        console.log(`member ${newMember.user.tag} updated for ${newMember.guild.name}`);
    },
})

export default guildMemberUpdate;