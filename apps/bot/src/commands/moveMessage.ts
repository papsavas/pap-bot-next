import { ActionRowBuilder, ApplicationCommandType, ChannelSelectMenuBuilder, ChannelType, ComponentType, MessageContextMenuCommandInteraction, RESTJSONErrorCodes, TextChannel, WebhookClient } from "discord.js";
import { makeCommand } from "../utils/commands/makeCommand";

const commandName = "move-message" as const;

const moveMessageCommand = makeCommand({
    command: commandName,
    data: {
        name: commandName,
        type: ApplicationCommandType.Message

    },
    execute: async (socket, command: MessageContextMenuCommandInteraction) => {
        const message = command.targetMessage;
        const guildChannels = command.guild?.channels;
        if (!guildChannels) return
        const select = new ChannelSelectMenuBuilder({
            customId: "move_msg_channel_select",
            channelTypes: [ChannelType.GuildText],
            placeholder: "Select a channel",
        })
        const res = await command.reply({
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

        return webhookClient.send({
            username: `${message.author.username}`,
            avatarURL: message.author.avatarURL() ?? undefined,
            content: message.content,
            embeds: message.embeds,
            components: message.components,
        })
            .then(() => collectedSelect.editReply({
                content: "Message Moved"
            }))
            //TODO!: does not catch
            .catch(err => {
                console.log(err.code, JSON.stringify(err))
                if (err.code === RESTJSONErrorCodes.MissingPermissions)
                    collectedSelect.editReply({
                        content: "I do not have permissions to create webhooks on this channel"
                    })
            })
    }
})

export default moveMessageCommand;