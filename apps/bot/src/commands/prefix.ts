import { ApplicationCommandType, ChatInputCommandInteraction } from "discord.js";
import { makeCommand } from "../utils/commands/makeCommand";

const prefixCommand = makeCommand({
    command: "prefix",
    data: {
        name: "prefix",
        description: "prefix for manual commands",
        type: ApplicationCommandType.ChatInput
    },
    execute: async (socket, interaction: ChatInputCommandInteraction) => {
        await interaction.deferReply({ ephemeral: true });
        if (!interaction.inGuild())
            return interaction.editReply({ content: "This is a guild only command" });
        const value = interaction.options.getString('prefix');
        if (!value)
            return interaction.editReply({
                content: `Current prefix is <IN_DEVELOPMENT>`
            })
        const { guildId, user } = interaction;
        socket.emit("prefix", {
            guildId, value, userId: user.id
        }, async ({ value }) => {
            await interaction.editReply(`Prefix set to ${value}`);
        })
    }

})

export default prefixCommand;