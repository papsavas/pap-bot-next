import { ApplicationCommandOptionType, ApplicationCommandType, ChatInputCommandInteraction, EmbedBuilder, italic, RESTJSONErrorCodes, roleMention, userMention } from "discord.js";
import { createReactionNotificationsId } from "../handlers/reactionNotifications";
import Command from "../lib/commands/Command";

const targetOption = "target";
const [addSubCmd, showSubCmd, clearSubCmd] = ["add", "show", "clear"];

const reactionNotifierCommand = new Command({
    data: {
        name: "reaction-notifier",
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
    },
    execute: async ({ reply, deferReply, warnings, source: command, sliced, source, user, ctx }) => {
        if (!command.inGuild())
            return reply({ content: warnings.only.guild })

        if (!(command instanceof ChatInputCommandInteraction))
            return reply({ content: warnings.only.slashCommand })

        const [guildId, userId] = [command.guildId, user.id];
        return deferReply(async () => {
            const [subCmd, targetId] =
                [
                    command.options.getSubcommand(true),
                    (command.options.resolved?.roles ?? command.options.resolved?.members)?.firstKey()
                ]

            switch (subCmd) {
                case addSubCmd: {
                    //establish dms or abort
                    if (!targetId)
                        return reply({ content: `Please provide a target (role or member)` })
                    try {
                        await user.send(italic(`This message establishes our DM channel where i will notify you about reaction notifications.`))
                    } catch (error: any) {
                        if (error.code === RESTJSONErrorCodes.CannotSendMessagesToThisUser)
                            return reply({
                                content: warnings.closedDms
                            })
                    }
                    //update cache and db
                    ctx.reactionNotifier.set(createReactionNotificationsId({ guildId, userId, targetId }), {
                        userId,
                        targetId,
                        guildId
                    }, true)

                    //respond to user
                    return reply({ content: `Enabled notifications for ${targetId ?? "all"}` })
                }

                case showSubCmd: {
                    const filtered = ctx.reactionNotifier
                        .filter(v => v.guildId === guildId && v.userId === user.id);
                    return reply({
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
                    const removed = ctx.reactionNotifier.sweep(v => v.guildId === guildId, true);
                    return reply({ content: `Removed ${removed} targets` });
                }
            }

        }, { ephemeral: true, fetchReply: true })
    }
})

export const { name, data } = reactionNotifierCommand;

export default reactionNotifierCommand;