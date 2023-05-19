import { ActionRowBuilder, ApplicationCommandType, AttachmentBuilder, AttachmentPayload, ChannelSelectMenuBuilder, ChannelType, ComponentType, DiscordAPIError, JSONEncodable, MessageContextMenuCommandInteraction, RESTJSONErrorCodes, TextChannel, WebhookClient } from "discord.js";
import { Command } from "../lib/commands/Command";

const moveMessageCommand = new Command({
    data: {
        name: "move-message",
        type: ApplicationCommandType.Message
    },
    execute: async ({ source: command, warnings, reply }) => {
        if (!(command instanceof MessageContextMenuCommandInteraction)) {
            return reply({
                content: warnings.only.messageContext,
                ephemeral: true
            })
        }

        const message = command.targetMessage;
        const guildChannels = command.guild.channels;
        if (!guildChannels) return
        const select = new ChannelSelectMenuBuilder({
            customId: "move_msg_channel_select",
            channelTypes: [ChannelType.GuildText],
            placeholder: "Select a channel",
        })
        const res = await reply({
            ephemeral: true,
            components: [
                new ActionRowBuilder<ChannelSelectMenuBuilder>()
                    .setComponents(select)
            ]
        });

        const collectedSelect = await res.awaitMessageComponent({
            componentType: ComponentType.ChannelSelect
        });

        await collectedSelect.deferReply({ ephemeral: true });

        const targetChannelId = collectedSelect.values[0];
        const targetChannel = command.guild.channels.cache.get(targetChannelId) as TextChannel;
        const webhook = await targetChannel.createWebhook({
            name: `move-message-${message.author.tag}-${message.id}`,
            reason: `Move Message for ${message.author.tag}`
        });

        const webhookClient = new WebhookClient({ url: webhook.url });

        try {
            const sentMsg = await webhookClient.send({
                username: `${message.author.username} from #${(message.channel as TextChannel).name}`,
                avatarURL: message.author.avatarURL() ?? undefined,
                content: message.content,
                embeds: message.embeds,
                components: message.components,
                files: message.attachments.map(a => AttachmentBuilder
                    .from(a as JSONEncodable<AttachmentPayload>).setName(a.name)
                )
            })

            await collectedSelect.editReply({
                content: `Message moved in ${targetChannel.name}`
            });
            //TODO!: not catching
        } catch (err) {
            if ((err as DiscordAPIError).code === RESTJSONErrorCodes.MissingPermissions)
                await collectedSelect.editReply({
                    content: "I am missing permissions"
                })
        }
    }
})

export const { name, data } = moveMessageCommand;

export default moveMessageCommand;