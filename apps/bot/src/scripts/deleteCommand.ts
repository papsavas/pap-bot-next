
import { deleteCommand, getCommands } from "../lib/commands/rest";



const [path, file, inputCommand, guildId, ...args] = process.argv;
if (!inputCommand) throw new Error("You must provide a command name");
const commands = await getCommands({ guildId });
const cmd = commands.find(c => c.name === inputCommand);
if (!cmd)
    throw new Error(`Command ${inputCommand} not found. 
Available commands: ${commands.map(f => f.name).toString()}`);

console.log(`deleting /${cmd.name} for ${guildId ?? "global"}...`);
const res = await deleteCommand({ commandId: cmd.id, guildId });
console.log(res, `\ndeleted command "${cmd.name}" for ${guildId ?? "global"}`);
process.exit(0);