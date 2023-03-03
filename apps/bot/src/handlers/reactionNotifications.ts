import { Colors, EmbedBuilder, MessageReaction, User } from "discord.js";
import { guildReactionNotifiers } from "..";

export const handleReactionNotifications = async (reaction: MessageReaction, user: User) => {
    if (reaction.message.inGuild()) {
        const guildId = reaction.message.guildId;
        const msg = reaction.message;
        const authorId = msg.author.id;
        const shouldNotify = () => {
            const grn = guildReactionNotifiers.get(guildId);
            if (!grn) return false;
            const targetResolver = grn.targetId ? user.id === grn.targetId : true
            return grn.users.includes(authorId) && targetResolver
        }

        if (shouldNotify()) {
            console.log(`notifying ${msg.author.tag} for ${user.tag} reaction on ${msg.url}`)
            msg.author
                .send({
                    embeds: [new EmbedBuilder({
                        author: { name: user.tag, iconURL: user.avatarURL() ?? undefined },
                        title: `Reacted with ${reaction.emoji.name} in ${reaction.message.guild.name}`,
                        fields: [{
                            name: "Message",
                            value: `[${msg.content.slice(0, 1000)}](${msg.url})`
                        }],
                        thumbnail: { url: reaction.message.guild.banner! },
                        color: Colors.Red
                    })]
                })
                .catch(console.error)
        }
    }
}