import { AttachmentBuilder, AttachmentPayload, Client, Collection, JSONEncodable, Message, Snowflake, TextChannel, WebhookClient } from "discord.js";

const MAX_LIMIT_MESSAGE_CHUNK = 100;

export async function migrateMessages(client: Client, guildId: string, oldChannelId: string, newChannelId: string) {
    const guild = await client.guilds.fetch(guildId);
    console.log(`fetched ${guild.name}`);
    const oldChannel = await guild.channels.fetch(oldChannelId);
    console.log(`fetched old channel ${oldChannel?.name}`);
    const newChannel = await guild.channels.fetch(newChannelId);
    console.log(`fetched new channel ${newChannel?.name}`);
    if (!(oldChannel && newChannel)) throw new Error("Channels not found");
    if (!(oldChannel.isTextBased() && newChannel.isTextBased())) throw new Error("Channels are not text based");

    const webhook = await (newChannel as TextChannel).createWebhook({
        name: `mocking-users`,
        reason: `Channel migration ${oldChannel.name} -> ${newChannel.name}`
    });

    const fetchMessages = async (beforeMsgId?: string) => {
        const res = await oldChannel.messages.fetch({ limit: MAX_LIMIT_MESSAGE_CHUNK, before: beforeMsgId })
        return res.reverse()
    }

    const collectAllMessages = async () => {
        let allMessages = new Collection<Snowflake, Message<true>>();
        let chunk = await fetchMessages();
        allMessages = chunk.concat(allMessages);
        while (chunk.size > 0) {
            console.log(`fetching previous chunk`);
            chunk = await fetchMessages(chunk.firstKey());
            allMessages = chunk.concat(allMessages);
        }
        return allMessages;
    }
    let counter = 0;
    const allMessages = await collectAllMessages()
    for (const [msdId, oldMessage] of allMessages) {
        counter++;
        try {
            const webhookClient = new WebhookClient({ url: webhook.url });
            const newAPIMessage = await webhookClient.send({
                username: `${oldMessage.author.tag}`,
                avatarURL: oldMessage.author.avatarURL() ?? undefined,
                content: oldMessage.content,
                embeds: oldMessage.embeds,
                components: oldMessage.components,
                files: oldMessage.attachments.map(a => AttachmentBuilder
                    .from(a as JSONEncodable<AttachmentPayload>).setName(a.name)
                )
            })
            if (oldMessage.pinned) {
                const newMessage = await newChannel.messages.fetch(newAPIMessage.id);
                console.log(`should pin ${newMessage.url}`);
                newMessage.pinnable && newMessage.pin("pinned in old channel")
            }
            console.log(`(${counter}/${allMessages.size}) moved ${oldMessage.url}`);
        } catch (error) {
            console.error(error)
        }
    }
    await webhook.delete("migration completed");
}


