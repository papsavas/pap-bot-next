import { ApplicationCommandOptionType, ApplicationCommandType, ChatInputCommandInteraction, CommandInteraction, Message, userMention } from "discord.js";
import { cache } from "..";
import { CommandHandler, CommandSource } from "../types/Command";
import { makeCommand } from "../utils/commands/makeCommand";
import { sliceCommand } from "../utils/commands/slice";

const commandName = "prefix" as const;
const valueOption = "value";

const resolveInput: CommandHandler =
    async (source: CommandSource) => {

    }

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
    execute: async (source: CommandSource) => {
        if (source instanceof CommandInteraction) {
            await source.deferReply({ ephemeral: true });
            if (!source.inGuild()) {
                return source.editReply("This is a guild only command")
            }
            const value = (source as ChatInputCommandInteraction).options.getString(valueOption);
            if (!value) {
                const prefix = cache.prefix.get(source.guildId)!
                await source.editReply({
                    content: `Current prefix is set to \`${prefix.value}\` by ${userMention(prefix.userId)}`
                })
                return;
            }
        }

        else if (source instanceof Message) {
            if (!source.inGuild()) {
                return source.reply("This is a guild only command")
            }

            const prefix = cache.prefix.get(source.guildId)!
            const { arg1 } = sliceCommand(source, prefix.value);
            if (!arg1)
                return source.reply(`Current prefix is set to \`${prefix.value}\` by ${userMention(prefix.userId)}`)
        }
    }
})

export default prefixCommand;