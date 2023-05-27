import { ActionRowBuilder, ApplicationCommandOptionType, ApplicationCommandType, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, ComponentType, EmbedBuilder } from "discord.js";
import Command from "../lib/commands/Command";

const [textOption, pingOption, timeOption] = ["text", "ping", "time",];

const pollCommand = new Command({
    data: {
        name: "poll",
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
    },
    execute: async ({ source, deferReply, reply, warnings, sliced, user }) => {
        if (!source.inGuild())
            return reply({ content: warnings.only.guild });

        return deferReply(async () => {

            const [text, timeLimit, pingRole, username] =
                source instanceof ChatInputCommandInteraction ?
                    [
                        source.options.getString(textOption, true),
                        source.options.getNumber(timeOption, false),
                        source.options.getRole(pingOption, false),
                        source.user.username
                    ] :
                    [
                        sliced!.args1,
                        null,
                        null,
                        user.username
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

            const response = await reply({
                fetchReply: true,
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
                response.edit({
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
                response.edit({
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

export const { name, data } = pollCommand;

export default pollCommand;