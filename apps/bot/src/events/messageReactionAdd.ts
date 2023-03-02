import { Colors, EmbedBuilder } from "discord.js";
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
            const u = user.partial ? await user.fetch() : user;
            const shouldNotify = guildReactionNotifiers.get(guildId)?.includes(authorId)

            if (shouldNotify) {
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