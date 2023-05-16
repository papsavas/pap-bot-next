import { ApplicationCommandData, ApplicationCommandOptionType, ApplicationCommandType, bold, ChatInputCommandInteraction, EmbedBuilder, italic, RESTJSONErrorCodes, roleMention, spoiler, userMention } from "discord.js";
import { ctx } from "..";
import { createReactionNotificationsId } from "../handlers/reactionNotifications";
import { makeCommand } from "../lib/commands/makeCommand";

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
    execute: async (command: ChatInputCommandInteraction) => {
        await command.deferReply({ ephemeral: true, fetchReply: true })

        if (!command.inGuild()) return command.editReply({ content: "This command is guild only" })

        const subCmd = command.options.getSubcommand(true);

        switch (subCmd) {
            case addSubCmd: {
                //establish dms or abort
                try {
                    await command.user.send(italic(`This message establishes our DM channel where i will notify you about reaction notifications.`))
                } catch (error: any) {
                    if (error.code === RESTJSONErrorCodes.CannotSendMessagesToThisUser)
                        await command.editReply({
                            content: `Your DMs for this guild are closed, please open them or you will not be able to receive reaction notifications.
${bold(italic(`Server name dropdown => Privacy Settings => Direct Messages ✅`) + " After, you'll need to retry this command")}
${spoiler("Tip: Once a DM channel between us is established you can close them again everywhere")}`
                        })
                    return
                }
                const resolvedValues = command.options.resolved;
                const targetId = (resolvedValues?.roles ?? resolvedValues?.members)!.firstKey()!;
                const [guildId, userId] = [command.guildId, command.user.id];
                //update cache and db
                ctx.reactionNotifier.set(createReactionNotificationsId({ guildId, userId, targetId }), {
                    userId,
                    targetId,
                    guildId
                }, true)

                //respond to user
                return command.editReply(`Enabled notifications for ${targetId ?? "all"}`)
            }

            case showSubCmd: {
                const filtered = ctx.reactionNotifier
                    .filter(v => v.guildId === command.guildId && v.userId === command.user.id);
                return command.editReply({
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
                return command.editReply(`Removed ${removed} targets`);
            }
        }


    }
})

export default ReactionNotifierCommand;