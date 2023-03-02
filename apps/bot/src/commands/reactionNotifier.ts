import { ActionRowBuilder, ApplicationCommandType, ChatInputCommandInteraction, ComponentType, StringSelectMenuBuilder } from "discord.js";
import { prisma } from "server";
import { makeCommand } from "../utils/commands/makeCommand";
import { updateCachedReactionNotifiers } from "../utils/settings/reactionNotifier";

const commandName = "reaction-notifier" as const;
const allGuildsOption = "all_guilds" as const;

const ReactionNotifierCommand = makeCommand({
    command: commandName,
    data: {
        name: commandName,
        description: "Setup reaction notifications",
        type: ApplicationCommandType.ChatInput,

    },
    execute: async (socket, command: ChatInputCommandInteraction) => {
        await command.deferReply({ ephemeral: true, fetchReply: true })
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
        const response = await command.editReply({
            components: [
                new ActionRowBuilder<StringSelectMenuBuilder>()
                    .setComponents(select)
            ]
        });

        const res = await response.awaitMessageComponent({
            componentType: ComponentType.StringSelect,
        })

        const resolvedValues = res.values.includes(allGuildsOption) ? [] : res.values;
        const userId = command.user.id;

        //update db
        await prisma.reactionNotifications.upsert({
            where: { userId },
            update: {
                guilds: resolvedValues
            },
            create: {
                userId,
                guilds: resolvedValues
            }
        })

        await res.reply({
            content: `You selected ${resolvedValues.length > 0 ?
                resolvedValues.map(id => memberGuilds.get(id)?.name).join(", ")
                : "All guilds"
                }. Make sure you have enabled dms`,
            ephemeral: true
        })

        //update cache
        await updateCachedReactionNotifiers(command.client, resolvedValues, userId);
    }
})

export default ReactionNotifierCommand;