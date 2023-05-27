import { ctx } from "../ctx";
import { makeEvent } from "../lib/makeEvent";

const guildMemberRemove = makeEvent({
    event: "guildMemberRemove",
    async execute(member) {
        console.log(`member ${member.user.tag} left ${member.guild.name}`);
        ctx.reactionNotifier.sweep(rn => rn.userId === member.id, true);
    },
})

export default guildMemberRemove;