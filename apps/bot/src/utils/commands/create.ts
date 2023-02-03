import { ApplicationCommandDataResolvable, ApplicationCommandManager, Snowflake } from "discord.js";

export default function createCommand(
    commandManager: ApplicationCommandManager,
    command: ApplicationCommandDataResolvable,
    guildId?: Snowflake
) {
    return commandManager.create(command, guildId);
}