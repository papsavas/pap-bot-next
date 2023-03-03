import { cache } from "..";
import { makeEvent } from "../utils/events/makeEvent";

const interactionCreate = makeEvent({
    event: "interactionCreate",
    async execute(socket, interaction) {
        if (interaction.isCommand()) {
            cache.commands.find(c => c.command === interaction.commandName)
                ?.execute(socket, interaction)
                ?? Promise.reject(`interaction ${interaction.commandName} is not handled`);
        }
    }
})

export default interactionCreate;