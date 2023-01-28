import deleteCommand from "../utils/commands/delete";
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

