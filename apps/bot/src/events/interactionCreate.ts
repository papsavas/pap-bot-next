import { join } from "node:path";
import { importDir } from "server";
import { Command } from "../types/Command";
import { makeEvent } from "../utils/events/makeEvent";

const commandFiles = importDir<Command>(join(__dirname, "..", "commands"), (f) => f.endsWith(".ts"))

const interactionCreate = makeEvent({
    event: "interactionCreate",
    async execute(socket, interaction) {
        if (interaction.isCommand()) {
            const commands = await Promise.all(commandFiles); //TODO: resolve once
            commands.find(c => c.command === interaction.commandName)
                ?.execute(socket, interaction)
                .catch(err => console.error("\x1b[31m", err))
                ?? Promise.reject(`${interaction.commandName} is not handled`);
        }
    }
})

export default interactionCreate;