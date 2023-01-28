import { ApplicationCommandManager, ApplicationCommandResolvable, Snowflake } from "discord.js";

export default async function deleteCommand(
    CommandManager: ApplicationCommandManager,
    command: ApplicationCommandResolvable,
    guildId?: Snowflake
) {
    return await CommandManager.delete(command, guildId);
}