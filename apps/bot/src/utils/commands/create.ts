import { ApplicationCommandDataResolvable, ApplicationCommandManager, Snowflake } from "discord.js";

export default async function createCommand(
    commandManager: ApplicationCommandManager,
    command: ApplicationCommandDataResolvable,
    guildId?: Snowflake
) {
    return await commandManager.create(command, guildId);
}