import { Colors, EmbedBuilder, MessageReaction, Snowflake, User } from "discord.js";
import { ctx } from "..";


export const handleReactionNotifications = async (reaction: MessageReaction, reactor: User) => {
    if (reaction.message.inGuild()) {
        const guildId = reaction.message.guildId;
        const msg = reaction.message;
        const authorId = msg.author.id;

        if (reactor.id === authorId) return;

        const userHasRole = async (userId: Snowflake, roleId: Snowflake) => {
            const member = await reaction.message.guild!.members.fetch(userId);
            return member.roles.cache.has(roleId);
        }

        let shouldNotify = false;
        for (const [_, rn] of ctx.reactionNotifier) {
            const baseCriteria = guildId === rn.guildId && authorId === rn.userId
            const reactorIsTarget = rn.targetId === reactor.id;
            if (!baseCriteria) continue;
            if (reactorIsTarget) {
                shouldNotify = true;
                break;
            }
            if (await userHasRole(reactor.id, rn.targetId)) {
                shouldNotify = true;
                break;
            }
        }

        if (shouldNotify) {
            console.log(`notifying ${msg.author.tag} for ${reactor.tag} reaction on ${msg.url}`)
            const messageValue = msg.content.length > 0 ? msg.content.slice(0, 1000) : `Jump to Message`
            msg.author
                .send({
                    embeds: [new EmbedBuilder({
                        author: { name: reactor.tag, iconURL: reactor.avatarURL() ?? undefined },
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