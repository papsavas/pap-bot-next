import { ApplicationCommandOptionType, ApplicationCommandType, bold, ChatInputCommandInteraction, italic, RESTJSONErrorCodes, spoiler } from "discord.js";
import { ctx } from "..";
import { makeCommand } from "../utils/commands/makeCommand";
import { resolveReactionNotificationId } from "../utils/resolveId";

//TODO: handle message execution
//TODO: add/remove subcommands

const name = "reaction-notifier";
const targetOption = "target";

const ReactionNotifierCommand = makeCommand({
    name,
    data: {
        name,
        description: "Setup reaction notifications",
        type: ApplicationCommandType.ChatInput,
        options: [
            {
                name: targetOption,
                description: "Receive notifications only from this role/user",
                type: ApplicationCommandOptionType.Mentionable,
                required: true
            }
        ]
    },
    execute: async (command: ChatInputCommandInteraction) => {
        await command.deferReply({ ephemeral: true, fetchReply: true })

        if (!command.inGuild()) return command.editReply({ content: "This command is guild only" })

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
        ctx.reactionNotifier.set(resolveReactionNotificationId({ guildId, userId, targetId }), {
            userId,
            targetId,
            guildId
        }, true)

        //respond to user
        command.editReply(`Enabled notifications for ${targetId ?? "all"}`)
    }
})

export default ReactionNotifierCommand;