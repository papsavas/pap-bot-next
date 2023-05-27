import { ctx } from "../ctx";
import { makeEvent } from "../lib/makeEvent";

const interactionCreate = makeEvent({
    event: "interactionCreate",
    async execute(interaction) {
        try {
            if (interaction.isCommand()) {
                //TODO: fix perf
                const cmd = ctx.commands.get(interaction.commandName);
                if (!cmd) throw `${interaction.type} ${interaction.commandName} is not handled`;
                await cmd.execute(interaction, ctx)
            }
        } catch (error) {
            console.error(`interaction type:${interaction.type} id:${interaction.id} failed\n`, error);
        }
    }
})

export default interactionCreate;