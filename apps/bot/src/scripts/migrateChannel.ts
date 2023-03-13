import { AttachmentBuilder, AttachmentPayload, JSONEncodable, Partials, TextChannel, WebhookClient } from "discord.js";
import client from "./client";

const bot = await client(
    ["GuildMembers", "GuildMessages", "GuildWebhooks", "Guilds"],
    [Partials.Channel, Partials.GuildMember, Partials.Message, Partials.ThreadMember]
)

const [path, file, guildId, oldChannelId, newChannelId, limit, ...rest] = process.argv;

if (!(guildId && oldChannelId && newChannelId))
    throw new Error("<guild_id> <old_channel_id> <new_channel_id> [limit]");

const guild = await bot.guilds.fetch(guildId);
console.log(`fetched ${guild.name}`);
const oldChannel = await guild.channels.fetch(oldChannelId);
console.log(`fetched old channel ${oldChannel?.name}`);
const newChannel = await guild.channels.fetch(newChannelId);
console.log(`fetched new channel ${newChannel?.name}`);
if (!(oldChannel && newChannel)) throw new Error("Channels not found");
if (!(oldChannel.isTextBased() && newChannel.isTextBased())) throw new Error("Channels are not text based");
const oldMessages = await oldChannel.messages.fetch({ limit: parseInt(limit) ?? 100 });
const webhook = await (newChannel as TextChannel).createWebhook({
    name: `mocking-users`,
    reason: `Channel migration ${oldChannel.name} -> ${newChannel.name}`
});

for (const [msdId, oldMessage] of oldMessages.reverse().entries()) {
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
        console.log(`moved ${oldMessage.url}`);
    } catch (error) {
        console.error(error)
    }
}

await webhook.delete("migration completed");
process.exit(0);
