import { ApplicationCommandOptionType, ApplicationCommandType, ChatInputCommandInteraction, userMention } from "discord.js";
import { ctx } from "../ctx";
import { Command } from "../lib/commands/Command";
import { NotServedError } from "../lib/errors";

const valueOption = "value";

const prefixCommand = new Command({
    data: {
        name: "prefix",
        description: "prefix for manual commands",
        type: ApplicationCommandType.ChatInput,
        options: [{
            name: valueOption,
            description: "Set new value for prefix",
            type: ApplicationCommandOptionType.String,
            required: false
        }]
    },
    execute: async ({ deferReply, reply, source, sliced, warnings, user, ctx }) => {
        return deferReply(() => {
            if (!source.inGuild()) {
                return reply({ content: warnings.only.guild });
            }
            const guildId = source.guildId;
            const value =
                source instanceof ChatInputCommandInteraction ?
                    source.options.getString(valueOption) :
                    sliced!.arg1
            if (!value) {
                const currPrefix = ctx.prefix.get(guildId);
                if (!currPrefix) throw new NotServedError("Prefix", guildId);
                return reply({ content: `Current prefix is set to \`${currPrefix.prefix}\` by ${userMention(currPrefix.userId)}` })
            }
            ctx.prefix.set(guildId, { prefix: value, userId: user.id }, true);
            return reply({ content: `Prefix set to \`${value}\`` });
        }, { ephemeral: true })
    }
})

export const { name, data } = prefixCommand

export default prefixCommand;