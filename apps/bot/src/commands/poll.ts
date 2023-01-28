import { ActionRowBuilder, ApplicationCommandOptionType, ApplicationCommandType, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, ComponentType } from "discord.js";
import { makeCommand } from "../utils/commands/makeCommand";

export default makeCommand({
    command: "poll",
    data: {
        name: "poll",
        description: "Creates a poll",
        type: ApplicationCommandType.ChatInput,
        options: [{
            name: "text",
            description: "the poll's message",
            required: true,
            type: ApplicationCommandOptionType.String
        }]

    },
    execute: async (socket, interaction: ChatInputCommandInteraction) => {
        const text = interaction.options.getString("text", true);
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

        const response = await interaction.reply({
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
            filter: (button, collector) =>
                collector
                    .every(collectedButton =>
                        collectedButton.user.id !== button.user.id
                    )
        })

        collector.on("collect", buttonInteraction => {
            buttonInteraction.customId === "upvote" ? ++upCount : ++downCount
            buttonInteraction.message.edit({
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
            }).then(() => buttonInteraction.reply({ content: `Thanks for voting` }))
        })
    }
})