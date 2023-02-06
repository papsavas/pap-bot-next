import { ApplicationCommandOptionType, ApplicationCommandType, ChatInputCommandInteraction, userMention } from "discord.js";
import { prisma } from "server";
import { makeCommand } from "../utils/commands/makeCommand";


const commandName = "prefix" as const;
const valueOption = "value";

const prefixCommand = makeCommand({
    command: commandName,
    data: {
        name: commandName,
        description: "prefix for manual commands",
        type: ApplicationCommandType.ChatInput,
        options: [{
            name: valueOption,
            description: "Set new value for prefix",
            type: ApplicationCommandOptionType.String,
            required: false
        }]
    },
    execute: async (socket, interaction: ChatInputCommandInteraction) => {
        await interaction.deferReply({ ephemeral: true });
        if (!interaction.inGuild())
            return interaction.editReply({ content: "This is a guild only command" });
        const value = interaction.options.getString(valueOption);
        if (!value) {
            const res = await prisma.prefix.findUniqueOrThrow({ where: { guild_id: interaction.guildId } });
            return interaction.editReply({
                content: `Current prefix is set to \`${res.value}\` by ${userMention(res.userId)}`
            })
        }

        const { guildId, user } = interaction;
        socket.emit("prefix", {
            guildId, value, userId: user.id
        }, async ({ value }) => {
            await interaction.editReply(`Prefix set to \`${value}\``);
        })
    }

})

export default prefixCommand;