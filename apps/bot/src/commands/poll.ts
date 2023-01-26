import { ActionRowBuilder, ApplicationCommandOptionType, ApplicationCommandType, ButtonBuilder, ChatInputCommandInteraction, ComponentType } from "discord.js";
import { Command } from "../types/Command";
import { makeCommand } from "../utils/makeCommand";

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
    async execute(socket, interaction: ChatInputCommandInteraction) {
        const data = interaction.options.getString("text");
        let [upCount, downCount] = [0, 0]
        const upvoteBtn = new ButtonBuilder({
            customId: "upvote",
            emoji: "➕",
            label: upCount.toString()

        })
        const downvoteBtn = new ButtonBuilder({
            customId: "downvote",
            emoji: "➖",
            label: upCount.toString()

        })

        const response = await interaction.reply({
            content: data!,
            components: [
                new ActionRowBuilder<ButtonBuilder>()
                    .setComponents(
                        ButtonBuilder.from(upvoteBtn),
                        ButtonBuilder.from(downvoteBtn)
                    )
            ]
        })

        const collector = response.createMessageComponentCollector({
            componentType: ComponentType.Button,
            filter: (button, collector) =>
                collector
                    .some(collectedButton =>
                        collectedButton.user.id === button.user.id
                    )
        })

        collector.on("collect", collected => {
            if (collected.customId === "upvote") upCount++
            else downCount++
            collected.message.edit({
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
            })
        })
    }

}) satisfies Command