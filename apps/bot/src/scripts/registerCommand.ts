import { dirname, join } from "node:path";
import { fileURLToPath } from 'node:url';
import { importDir } from "utils";
import { Command } from "../../types/Command";
import createCommand from "../utils/commands/create";
import client from "./client";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//TODO: use REST

const bot = await client(["Guilds"], []);
const [path, file, inputCommand, guildId, ...rest] = process.argv;
if (!inputCommand) throw new Error("You must provide a command name");
const files = await importDir<Command>(join(__dirname, "..", "commands"))
const cmd = files.find(c => c.name === inputCommand)
if (!cmd) throw new Error(`Command ${inputCommand} not found. 
Available commands: ${files.map(f => f.name).toString()}`);
const res = await createCommand(bot.application?.commands!, cmd.data, guildId);
console.log(`registered command "${res.name}" for ${guildId ?? "global command manager"}`);
process.exit(0);