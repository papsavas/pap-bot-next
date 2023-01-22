import { importDir } from "server";
import { Command } from "../types/Command";
import { makeEvent } from "../utils/makeEvent";

const commandFiles = importDir<Command>("commands", (f) => f.endsWith(".ts"))

export default makeEvent({
    event: "interactionCreate",
    async execute(socket, interaction) {
        const commands = await Promise.all(commandFiles);
        commands.find(c => c.command === interaction.id)
            ?.execute(socket, interaction) ?? Promise.reject(`${interaction.id} is not handled`);
    }
})