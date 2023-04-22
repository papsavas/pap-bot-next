import { ActionRowBuilder, ApplicationCommandOptionType, ApplicationCommandType, bold, ChatInputCommandInteraction, ComponentType, italic, RESTJSONErrorCodes, spoiler, StringSelectMenuBuilder } from "discord.js";
import { ctx } from "..";
import { makeCommand } from "../utils/commands/makeCommand";

//TODO: handle message execution
//TODO: support multiple users across multiple guilds

const name = "reaction-notifier";
const targetOption = "target";
const allGuildsOption = "all_guilds";

const ReactionNotifierCommand = makeCommand({
    name,
    data: {
        name,
        description: "Setup reaction notifications",
        type: ApplicationCommandType.ChatInput,
        options: [
            {
                name: targetOption,
                description: "Receive notifications only from this user",
                type: ApplicationCommandOptionType.User,
                required: false
            }
        ]
    },
    execute: async (command: ChatInputCommandInteraction) => {
        await command.deferReply({ ephemeral: true, fetchReply: true })

        //establish dms or abort
        try {
            await command.user.send(italic(`This message establishes our DM channel where i will notify you. Continue with selecting in guild`))
        } catch (error: any) {
            if (error.code === RESTJSONErrorCodes.CannotSendMessagesToThisUser)
                await command.editReply({
                    content: `Your DMs for this guild are closed, please open them or you will not be able to receive reaction notifications.
${bold(italic(`Server name dropdown => Privacy Settings => Direct Messages ✅`) + " After, you'll need to retry this command")}
${spoiler("Tip: Once a DM channel between us is established you can close them again everywhere")}`
                })
            return
        }

        const target = command.options.getUser(targetOption, false);
        const memberGuilds = command.client.guilds.cache
            .filter(async g => (await g.members.fetch()).has(command.user.id))
        const select = new StringSelectMenuBuilder({
            custom_id: "reaction_notifier_guilds_select",
            placeholder: "Select guild(s)",
            type: ComponentType.StringSelect,
            maxValues: memberGuilds.size + 1,
            options: memberGuilds.map(
                (g, gid) => ({
                    label: g.name,
                    value: gid,
                })
            )
        });
        select.addOptions([{
            label: "All",
            value: allGuildsOption,
            description: "This will ignore other selections and notify you for all received reactions across guilds"
        }])

        const selectMessage = await command.editReply({
            components: [
                new ActionRowBuilder<StringSelectMenuBuilder>()
                    .setComponents(select)
            ]
        });

        const collectedSelect = await selectMessage.awaitMessageComponent({
            componentType: ComponentType.StringSelect,
        })

        const selectedGuilds = collectedSelect.values.includes(allGuildsOption) ? [] : collectedSelect.values;
        const userId = command.user.id;

        //update cache and db
        ctx.reactionNotifier.set(userId, {
            targetId: target?.id ?? null,
            guilds: selectedGuilds
        }, true)

        //respond to user
        await collectedSelect.reply({
            content: `You selected ${selectedGuilds.length > 0 ?
                selectedGuilds.map(id => memberGuilds.get(id)?.name).join(", ")
                : "All guilds"
                }`,
            ephemeral: true
        })
    }
})

export default ReactionNotifierCommand;