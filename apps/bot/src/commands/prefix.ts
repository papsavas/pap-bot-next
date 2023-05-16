import { ApplicationCommandData, ApplicationCommandOptionType, ApplicationCommandType, ChatInputCommandInteraction, CommandInteraction, Message, userMention } from "discord.js";
import { ctx } from "..";
import { CommandSource } from "../../types/Command";
import { makeCommand } from "../lib/commands/makeCommand";
import { sliceCommand } from "../lib/commands/slice";

const name = "prefix";
const valueOption = "value";

export const data = {
    name,
    description: "prefix for manual commands",
    type: ApplicationCommandType.ChatInput,
    options: [{
        name: valueOption,
        description: "Set new value for prefix",
        type: ApplicationCommandOptionType.String,
        required: false
    }]
} satisfies ApplicationCommandData

const prefixCommand = makeCommand({
    name,
    data,
    execute: async (source: CommandSource) => {
        if (source instanceof CommandInteraction) {
            await source.deferReply({ ephemeral: true });
            if (!source.inGuild()) {
                return source.editReply("This is a guild only command")
            }
            const value = (source as ChatInputCommandInteraction).options.getString(valueOption);
            if (!value) {
                const { prefix, userId } = ctx.prefix.get(source.guildId)!
                return source.editReply({
                    content: `Current prefix is set to \`${prefix}\` by ${userMention(userId)}`
                })
            }
            //update cache and db
            ctx.prefix.set(source.guildId, { prefix: value, userId: source.user.id }, true);
            source.editReply(`Prefix set to \`${value}\``);
        }

        else if (source instanceof Message) {
            if (!source.inGuild()) {
                return source.reply("This is a guild only command")
            }

            const { prefix, userId } = ctx.prefix.get(source.guildId)!
            const { arg1 } = sliceCommand(source, prefix);
            if (!arg1)
                return source.reply(`Current prefix is set to \`${prefix}\` by ${userMention(userId)}`)
            //update cache and db
            ctx.prefix.set(source.guildId, { prefix: arg1, userId: source.author.id }, true);
            return source.reply(`Prefix set to \`${arg1}\``);
        }
    }
})

export default prefixCommand;