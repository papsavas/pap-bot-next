import { guildReactionNotifiers } from "..";
import { makeEvent } from "../utils/events/makeEvent";

const messageReactionAdd = makeEvent({
    event: "messageReactionAdd",
    async execute(socket, reaction, user) {
        if (reaction.message.inGuild()) {
            const guildId = reaction.message.guildId;
            const r = await reaction.fetch();
            const msg = await r.message.fetch()
            const authorId = msg.author.id;
            const shouldNotify = guildReactionNotifiers.get(guildId)?.includes(authorId)
            if (shouldNotify) {
                console.log(`notifying ${msg.author.tag} for ${user.tag} reaction on ${msg.url}`)
                msg.author
                    .send(`${user.tag} reacted with ${reaction.emoji.name} on ${reaction.message.url}`)
                    .catch(console.error)
            }
        }
    },
})

export default messageReactionAdd;