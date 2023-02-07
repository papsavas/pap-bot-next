import { ApplicationCommandOptionType, ApplicationCommandType, ChatInputCommandInteraction, CommandInteraction, Message, userMention } from "discord.js";
import { prisma } from "server";
import { ActionOptions } from "server/src/types/Actions";
import { CommandHandler, CommandSource } from "../types/Command";
import { Nullable } from "../types/Utilities";
import { makeCommand } from "../utils/commands/makeCommand";
import { sliceCommand } from "../utils/commands/slice";


const commandName = "prefix" as const;
const valueOption = "value";

const resolveInput: CommandHandler<typeof commandName> =
    async (source: CommandSource<"prefix">) => {
        const res: Nullable<ActionOptions[typeof commandName]> = {
            guildId: null,
            userId: null,
            value: null
        };
        if (source instanceof CommandInteraction) {

            await source.deferReply({ ephemeral: true });
            if (!source.inGuild()) {
                return {
                    res,
                    callback: async () => {
                        await source.editReply({ content: "This is a guild only command" })
                    }
                }
            }
            const value = (source as ChatInputCommandInteraction).options.getString(valueOption);
            if (!value) {
                const storedPrefix = await prisma.prefix.findUniqueOrThrow({ where: { guild_id: source.guildId } });
                return {
                    res,
                    callback: async () => {
                        await source.editReply({
                            content: `Current prefix is set to \`${storedPrefix.value}\` by ${userMention(storedPrefix.userId)}`
                        })
                    }
                }
            }
            //set values to returned object
            res.guildId = source.guildId;
            res.userId = source.user.id;
            res.value = value
            return {
                res,
                callback: async () => {
                    await source.editReply(`Prefix set to \`${value}\``);
                }
            }
        }
        else if (source instanceof Message) {
            if (!source.inGuild()) {
                return {
                    res, callback: async () => {
                        await source.reply("This is a guild only command")
                    }
                }
            }
            const storedPrefix = await prisma.prefix.findUniqueOrThrow({ where: { guild_id: source.guildId } });
            const { arg1 } = sliceCommand(source, storedPrefix.value);
            if (!arg1)
                return {
                    res,
                    callback: async () => {
                        await source.reply(`Current prefix is set to \`${storedPrefix.value}\` by ${userMention(storedPrefix.userId)}`)
                    }
                }
            res.guildId = source.guildId;
            res.userId = source.author.id;
            res.value = arg1;
            return {
                res,
                callback: async () => {
                    await source.reply(`Prefix set to \`${arg1}\``)
                }
            }
        }
        //Action invocation
        else {
            return {
                res: source
            }
        }
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
    execute: async (socket, source: CommandSource<typeof commandName>) => {
        const { res, callback } = await resolveInput(source)

        if (Object.values(res).find(v => v === null)) {
            if (callback)
                callback()
            return
        }
        socket.emit(commandName, res as NonNullable<ActionOptions[typeof commandName]>, callback)
    }

})

export default prefixCommand;