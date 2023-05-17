import { ApplicationCommandData, ApplicationCommandOptionType, ApplicationCommandType, ChatInputCommandInteraction, CommandInteraction, EmbedBuilder, italic, RESTJSONErrorCodes, roleMention, userMention } from "discord.js";
import { ctx } from "..";
import { CommandSource } from "../../types/Command";
import { createReactionNotificationsId } from "../handlers/reactionNotifications";
import { makeCommand } from "../lib/commands/makeCommand";
import { sliceCommand } from "../lib/commands/slice";
import { warnings } from "../lib/commands/warnings";
import { NotServedError } from "../lib/errors";
import SourceHandler from "../lib/SourceHandler";


//TODO: handle message execution

const name = "reaction-notifier";
const targetOption = "target";
const [addSubCmd, showSubCmd, clearSubCmd] = ["add", "show", "clear"];

export const data = {
    name,
    description: "Notifications for User/Role reactions",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: addSubCmd,
            description: "Add User/Role",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: targetOption,
                    description: "Receive react notifications from this role/user",
                    type: ApplicationCommandOptionType.Mentionable,
                    required: true
                }
            ]
        },
        {
            name: showSubCmd,
            description: "Display current targets",
            type: ApplicationCommandOptionType.Subcommand,
        },
        {
            name: clearSubCmd,
            description: "Delete all targets",
            type: ApplicationCommandOptionType.Subcommand,
        }
    ]
} satisfies ApplicationCommandData

const ReactionNotifierCommand = makeCommand({
    name,
    data,
    execute: async (command: CommandSource) => {
        const handler = SourceHandler(command);
        if (!command.inGuild())
            return handler.reply({ content: warnings(name).only.guild })
        const ctxPrefix = ctx.prefix.get(command.guildId);
        if (!ctxPrefix) throw new NotServedError("Reaction Notifier", command.guildId)
        return handler.deferReply(async () => {
            const [subCmd, targetId] =
                command instanceof CommandInteraction ?
                    [
                        (command as ChatInputCommandInteraction).options.getSubcommand(true),
                        (command.options.resolved?.roles ?? command.options.resolved?.members)?.firstKey()] :
                    [
                        sliceCommand(command, ctxPrefix.prefix).arg1,
                        sliceCommand(command, ctxPrefix.prefix).arg2
                    ];

            const user = command instanceof CommandInteraction ? command.user : command.author;
            switch (subCmd) {
                case addSubCmd: {
                    //establish dms or abort
                    if (!targetId)
                        return handler.reply({ content: `\`Target not provided. \n ${ctxPrefix.prefix}${name} add <targetId>\`` })
                    try {
                        await user.send(italic(`This message establishes our DM channel where i will notify you about reaction notifications.`))
                    } catch (error: any) {
                        if (error.code === RESTJSONErrorCodes.CannotSendMessagesToThisUser)
                            await handler.reply({
                                content: warnings(name).closedDms
                            })
                        return
                    }
                    const [guildId, userId] = [command.guildId, user.id];
                    //update cache and db
                    ctx.reactionNotifier.set(createReactionNotificationsId({ guildId, userId, targetId }), {
                        userId,
                        targetId,
                        guildId
                    }, true)

                    //respond to user
                    return handler.reply({ content: `Enabled notifications for ${targetId ?? "all"}` })
                }

                case showSubCmd: {
                    const filtered = ctx.reactionNotifier
                        .filter(v => v.guildId === command.guildId && v.userId === user.id);
                    return handler.reply({
                        embeds: [
                            new EmbedBuilder({
                                title: "Current Targets",
                                description: filtered.size === 0 ? "-" : filtered.reduce(
                                    (acc, { targetId }) =>
                                        acc += `${command.guild!.roles.cache.has(targetId) ? roleMention(targetId) : userMention(targetId)}\n`, "")
                            })
                        ]
                    })
                }

                case clearSubCmd: {
                    const removed = ctx.reactionNotifier.sweep(v => v.guildId === command.guildId, true);
                    return handler.reply({ content: `Removed ${removed} targets` });
                }
            }

        }, { ephemeral: true, fetchReply: true })





    }
})

export default ReactionNotifierCommand;