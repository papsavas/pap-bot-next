import deleteCommand from "../utils/commands/delete";
import client from "./client";

const bot = await client(["Guilds"], []);
const [path, file, inputCommand, guildId, ...rest] = process.argv;
if (!inputCommand) throw new Error("You must provide a command name");
const commands = await bot.application?.commands.fetch({ guildId });
const cmd = commands?.find(c => c.name === inputCommand)
if (!cmd) throw new Error(`Command ${inputCommand} not found. 
Available commands:\n${commands?.map(c => c.name).join("\n")}`);
const res = await deleteCommand(bot.application?.commands!, cmd.id, guildId);
console.log(`deleted ${res?.name} command from ${guildId ?? "global manager"}`);
process.exit(0);
