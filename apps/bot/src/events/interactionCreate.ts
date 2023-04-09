import { ctx } from "..";
import { makeEvent } from "../utils/makeEvent";

const interactionCreate = makeEvent({
    event: "interactionCreate",
    async execute(interaction) {
        if (interaction.isCommand()) {
            ctx.commands.find(c => c.command === interaction.commandName)
                ?.execute(interaction)
                ?? Promise.reject(`interaction ${interaction.commandName} is not handled`);
        }
    }
})

export default interactionCreate;