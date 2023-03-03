import { Client, Colors, EmbedBuilder, MessageReaction, User } from "discord.js";
import { cache } from "..";


export const handleReactionNotifications = async (reaction: MessageReaction, user: User) => {
    if (reaction.message.inGuild()) {
        const guildId = reaction.message.guildId;
        const msg = reaction.message;
        const authorId = msg.author.id;
        const shouldNotify = () => {
            const grn = cache.reactionNotifier.get(guildId);
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


export const updateCachedReactionNotifiers = async (
    client: Client,
    guilds: string[],
    userId: User['id'],
    targetId?: User['id'] | null
) => {
    const guildIds = guilds.length === 0 ?
        //for all guilds
        [
            ...client.guilds.cache
                .filter(async g => (
                    //TODO?: use cached members
                    await g.members.fetch()
                ).has(userId))
                .keys()
        ] : guilds

    for (const guildId of guildIds) {
        const rn = cache.reactionNotifier.get(guildId);
        cache.reactionNotifier.set(guildId, {
            //add user
            users: [...rn?.users.values() ?? [], userId],
            targetId: targetId ?? rn?.targetId
        })
    }

}