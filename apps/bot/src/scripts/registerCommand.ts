
import { ApplicationCommandData, RESTPostAPIApplicationCommandsJSONBody } from "discord.js";
import { importDir } from "utils";
import { registerCommand } from "../utils/commands/rest";



const [path, file, inputCommand, guildId, ...args] = process.argv;
if (!inputCommand) throw new Error("You must provide a command name");
const files = await importDir<ApplicationCommandData>({
    path: "src/commands",
    exportName: "data",
    filter: (f) => f.endsWith(".ts")
});
const cmd = files.find((c, filename) => inputCommand === c.name || inputCommand === filename)
if (!cmd)
    throw new Error(`Command ${inputCommand} not found. 
Available commands: ${files.map(f => f.name).toString()}`);

console.log(`registering /${cmd.name} for ${guildId ?? "global"}...`);
const res = await registerCommand({ body: (cmd as RESTPostAPIApplicationCommandsJSONBody), guildId });
console.log(res, `\nregistered command "${cmd.name}" for ${guildId ?? "global"}`);
process.exit(0);