import { Colors, EmbedBuilder } from "discord.js";
import { guildReactionNotifiers } from "..";
import { makeEvent } from "../utils/events/makeEvent";
import { resolvePartial } from "../utils/Partials";

const messageReactionAdd = makeEvent({
    event: "messageReactionAdd",
    async execute(socket, reaction, user) {
        if (reaction.message.inGuild()) {
            const guildId = reaction.message.guildId;
            const r = await resolvePartial(reaction);
            const msg = await resolvePartial(r.message);
            const authorId = msg.author.id;
            const u = await resolvePartial(user);
            const shouldNotify = () => {
                const grn = guildReactionNotifiers.get(guildId);
                if (!grn) return false;
                const targetResolver = grn.targetId ? u.id === grn.targetId : true
                return grn.users.includes(authorId) && targetResolver
            }

            if (shouldNotify()) {
                console.log(`notifying ${msg.author.tag} for ${user.tag} reaction on ${msg.url}`)
                msg.author
                    .send({
                        embeds: [new EmbedBuilder({
                            author: { name: u.tag, iconURL: u.avatarURL() ?? undefined },
                            title: `Reaction Notifier from ${reaction.message.guild.name}`,
                            description: `[${msg.content.slice(0, 1000)}](${msg.url})`,
                            thumbnail: { url: reaction.message.guild.bannerURL({ size: 256 })! },
                            color: Colors.Red
                        })]
                    })
                    .catch(console.error)
            }
        }
    },
})

export default messageReactionAdd;