import { Colors, EmbedBuilder, MessageReaction, User } from "discord.js";
import { ctx } from "..";


export const handleReactionNotifications = async (reaction: MessageReaction, user: User) => {
    if (reaction.message.inGuild()) {
        const guildId = reaction.message.guildId;
        const msg = reaction.message;
        const authorId = msg.author.id;
        const shouldNotify = () => {
            const rn = ctx.reactionNotifier.get(authorId);
            if (!rn) return false;
            const targetResolver = rn.targetId ? user.id === rn.targetId : true
            return rn.guilds.includes(guildId) && targetResolver
        }

        if (shouldNotify()) {
            console.log(`notifying ${msg.author.tag} for ${user.tag} reaction on ${msg.url}`)
            const messageValue = msg.content.length > 0 ? msg.content.slice(0, 1000) : `Jump to Message`
            msg.author
                .send({
                    embeds: [new EmbedBuilder({
                        author: { name: user.tag, iconURL: user.avatarURL() ?? undefined },
                        title: `Reacted with ${reaction.emoji.name} in ${reaction.message.guild.name}`,
                        fields: [{
                            name: "Message",
                            value: `[${messageValue}](${msg.url})`
                        }],
                        thumbnail: { url: reaction.message.guild.banner! },
                        color: Colors.Red
                    })]
                })
                .catch(console.error)
        }
    }
}