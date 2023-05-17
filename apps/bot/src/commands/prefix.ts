import { ApplicationCommandData, ApplicationCommandOptionType, ApplicationCommandType, ChatInputCommandInteraction, CommandInteraction, userMention } from "discord.js";
import { ctx } from "..";
import { CommandSource } from "../../types/Command";
import SourceHandler from "../lib/SourceHandler";
import { makeCommand } from "../lib/commands/makeCommand";
import { sliceCommand } from "../lib/commands/slice";
import { warnings } from "../lib/commands/warnings";
import { NotServedError } from "../lib/errors";

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
        const handler = SourceHandler(source);
        return handler.deferReply(() => {
            if (!source.inGuild()) {
                return handler.reply({ content: warnings(name).only.guild });
            }
            const ctxPrefix = ctx.prefix.get(source.guildId)!;
            if (!ctxPrefix) throw new NotServedError(`Prefix`, source.guildId);
            const [value, userId] =
                source instanceof CommandInteraction ?
                    [(source as ChatInputCommandInteraction).options.getString(valueOption), source.user.id] :
                    [sliceCommand(source, ctxPrefix.prefix).arg1, source.author.id]
            if (!value)
                return handler.reply({ content: `Current prefix is set to \`${ctxPrefix.prefix}\` by ${userMention(ctxPrefix.userId)}` })
            ctx.prefix.set(source.guildId, { prefix: value, userId }, true);
            return handler.reply({ content: `Prefix set to \`${value}\`` });
        }, { ephemeral: true })
    }
})

export default prefixCommand;