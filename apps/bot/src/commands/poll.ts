import { ActionRowBuilder, ApplicationCommandData, ApplicationCommandOptionType, ApplicationCommandType, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, CommandInteraction, ComponentType, EmbedBuilder } from "discord.js";
import { ctx } from "..";
import { CommandSource } from "../../types/Command";
import SourceHandler from "../lib/SourceHandler";
import { makeCommand } from "../lib/commands/makeCommand";
import { sliceCommand } from "../lib/commands/slice";
import { NotServedError } from "../lib/errors";

const name = "poll";
const [textOption, pingOption, timeOption] = ["text", "ping", "time",];

export const data = {
    name,
    description: "Creates a poll",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: textOption,
            description: "the poll's message",
            required: true,
            type: ApplicationCommandOptionType.String
        },
        {
            name: timeOption,
            description: "Minutes to keep poll active",
            type: ApplicationCommandOptionType.Number,
            minValue: 1,
            maxValue: 10,
            required: false
        },
        {
            name: pingOption,
            description: "Role to ping",
            type: ApplicationCommandOptionType.Role,
            required: false,
        }

    ]
} satisfies ApplicationCommandData

const pollCommand = makeCommand({
    name,
    data,
    execute: async (source: CommandSource) => {
        const handler = SourceHandler(source);
        if (!source.inGuild())
            return handler.reply({ content: "This is a guild only command" });
        const ctxPrefix = ctx.prefix.get(source.guildId);
        if (!ctxPrefix) throw new NotServedError("Poll", source.guildId);
        return handler.deferReply(async () => {
            const [text, timeLimit, pingRole, username] =
                source instanceof CommandInteraction ?
                    [
                        (source as ChatInputCommandInteraction).options.getString(textOption, true),
                        (source as ChatInputCommandInteraction).options.getNumber(timeOption, false),
                        (source as ChatInputCommandInteraction).options.getRole(pingOption, false),
                        source.user.username
                    ] :
                    [
                        sliceCommand(source, ctxPrefix.prefix).arg1,
                        parseInt(sliceCommand(source, ctxPrefix.prefix).arg2),
                        source.mentions.roles.first(),
                        source.author.username
                    ]

            const embed = new EmbedBuilder({
                title: `${username} started a poll`,
                description: text,
                footer: timeLimit ? { text: `Lasts for ${timeLimit} minutes` } : undefined
            })
            let [upCount, downCount] = [0, 0];
            const upvoteBtn = new ButtonBuilder({
                customId: "upvote",
                emoji: "➕",
                label: upCount.toString(),
                style: ButtonStyle.Success
            })
            const downvoteBtn = new ButtonBuilder({
                customId: "downvote",
                emoji: "➖",
                label: upCount.toString(),
                style: ButtonStyle.Danger
            })

            const response = await handler.reply({
                content: pingRole?.toString(),
                allowedMentions: { parse: ["roles", "everyone"] },
                embeds: [embed],
                components: [
                    new ActionRowBuilder<ButtonBuilder>()
                        .setComponents(
                            ButtonBuilder.from(upvoteBtn),
                            ButtonBuilder.from(downvoteBtn)
                        )
                ]
            });

            const collector = response.createMessageComponentCollector({
                componentType: ComponentType.Button,
                time: timeLimit ? timeLimit * 60000 : undefined,
                filter: (button, collector) =>
                    //check if user has voted already
                    collector
                        .every(collectedButton =>
                            collectedButton.user.id !== button.user.id
                        )
            })

            collector.on("collect", buttonInteraction => {
                buttonInteraction.customId === "upvote" ? ++upCount : ++downCount
                handler.edit({
                    components: [
                        new ActionRowBuilder<ButtonBuilder>()
                            .setComponents(
                                ButtonBuilder.
                                    from(upvoteBtn).
                                    setLabel(upCount.toString()),
                                ButtonBuilder
                                    .from(downvoteBtn)
                                    .setLabel(downCount.toString())
                            )
                    ]
                }).then(() => buttonInteraction.reply({
                    content: `Thanks for voting ${buttonInteraction.component.emoji?.name}`,
                    ephemeral: true
                }))
            })

            collector.on("ignore", (buttonInteraction) => {
                buttonInteraction.reply({
                    content: "You voted already",
                    ephemeral: true
                })
            })

            collector.on("end", (collection) => {
                handler.edit({
                    embeds: [EmbedBuilder.from(embed).setFooter({
                        text: "Poll has ended. Thanks for voting!"
                    })],
                    components: [
                        new ActionRowBuilder<ButtonBuilder>()
                            .setComponents(
                                ButtonBuilder
                                    .from(upvoteBtn)
                                    .setLabel(upCount.toString())
                                    .setDisabled(),
                                ButtonBuilder
                                    .from(downvoteBtn)
                                    .setLabel(downCount.toString())
                                    .setDisabled()
                            )
                    ]
                })
            })
        })

    }
})

export default pollCommand;