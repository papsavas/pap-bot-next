import { ApplicationCommandDataResolvable, ApplicationCommandManager, Snowflake } from "discord.js";
import { join } from "node:path";
import { importDir } from "server";
import { Command } from "../types/Command";
import client from "./client";

(async function () {
    const bot = await client(["Guilds"], []);
    const [path, file, inputCommand, guildId, ...rest] = process.argv;
    const files = await Promise.all(importDir<Command>(join(__dirname, "..", "commands")))
    const cmd = files.find(c => c.command === inputCommand)
    if (!cmd) return console.error(`Command ${inputCommand} not found. 
Available commands: ${files.map(f => f.command).toString()}`)
    createCommand(bot.application?.commands!, cmd.data, guildId)
}
)()
export default async function createCommand(
    commandManager: ApplicationCommandManager,
    command: ApplicationCommandDataResolvable,
    guildId?: Snowflake
) {
    return await commandManager.create(command, guildId);
}