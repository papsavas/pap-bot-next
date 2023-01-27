import { ApplicationCommandManager, ApplicationCommandResolvable, Snowflake } from "discord.js";
import client from "./client";

(async function () {
    const bot = await client(["Guilds"], []);
    const [path, file, inputCommand, guildId, ...rest] = process.argv;
    const commands = await bot.application?.commands.fetch({ guildId });
    const cmd = commands?.find(c => c.name === inputCommand)
    if (!cmd) return console.error(`Command ${inputCommand} not found. 
Available commands: ${commands?.map(c => c.name).toString()}`)
    deleteCommand(bot.application?.commands!, cmd.id, guildId)
}
)()

export default async function deleteCommand(
    CommandManager: ApplicationCommandManager,
    command: ApplicationCommandResolvable,
    guildId?: Snowflake
) {
    return await CommandManager.delete(command, guildId);
}