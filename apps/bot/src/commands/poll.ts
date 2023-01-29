import { ActionRowBuilder, ApplicationCommandOptionType, ApplicationCommandType, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, ComponentType, italic } from "discord.js";
import { makeCommand } from "../utils/commands/makeCommand";

const pollCommand = makeCommand({
    command: "poll",
    data: {
        name: "poll",
        description: "Creates a poll",
        type: ApplicationCommandType.ChatInput,
        options: [
            {
                name: "text",
                description: "the poll's message",
                required: true,
                type: ApplicationCommandOptionType.String
            },
            {
                name: "time",
                description: "Minutes to keep poll active",
                type: ApplicationCommandOptionType.Number,
                minValue: 1,
                maxValue: 10,
                required: false
            }
        ]

    },
    execute: async (socket, interaction: ChatInputCommandInteraction) => {
        await interaction.deferReply();
        const text = interaction.options.getString("text", true);
        const timeLimit = interaction.options.getNumber("time", false);
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

        const response = await interaction.editReply({
            content: text,
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
            interaction.editReply({
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
            interaction.editReply({
                content: `${text}\n\n${italic(`Poll has ended. Thanks for voting`)}`,
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
    }
})

export default pollCommand;