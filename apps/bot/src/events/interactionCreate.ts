import { ctx } from "..";
import { makeEvent } from "../utils/makeEvent";

const interactionCreate = makeEvent({
    event: "interactionCreate",
    async execute(interaction) {
        try {
            if (interaction.isCommand()) {
                //TODO: fix perf
                const cmd = ctx.commands.get(interaction.commandName);
                if (!cmd) throw `${interaction.type} ${interaction.commandName} is not handled`;
                return await cmd.execute(interaction)
            }
        } catch (error) {
            console.error(`${interaction.type} ${interaction.id} failed\n`, error);
        }
    }
})

export default interactionCreate;