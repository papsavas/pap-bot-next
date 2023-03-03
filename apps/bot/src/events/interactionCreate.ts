import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { importDir } from "server";
import { Command } from "../types/Command";
import { makeEvent } from "../utils/events/makeEvent";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const commandFiles = importDir<Command>(join(__dirname, "..", "commands"), (f) => f.endsWith(".ts"))
const commands = await Promise.all(commandFiles);

const interactionCreate = makeEvent({
    event: "interactionCreate",
    async execute(socket, interaction) {
        if (interaction.isCommand()) {
            commands.find(c => c.command === interaction.commandName)
                ?.execute(socket, interaction)
                ?? Promise.reject(`interaction ${interaction.commandName} is not handled`);
        }
    }
})

export default interactionCreate;