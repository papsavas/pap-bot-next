import { ctx } from "../ctx";
import { sliceCommand } from "../lib/commands/slice";
import { NotServedError } from "../lib/errors";
import { makeEvent } from "../lib/makeEvent";

const messageCreate = makeEvent({
    event: "messageCreate",
    async execute(message) {
        if (message.inGuild()) {
            const guildCommandPrefix = ctx.prefix.get(message.guildId)
            if (!guildCommandPrefix) throw new NotServedError("messageCreate", message.guildId);
            if (message.content.startsWith(guildCommandPrefix.prefix)) {
                const { primaryCommand } = sliceCommand(message, guildCommandPrefix.prefix);
                const cmd = ctx.commands.find(cmd => cmd.name === primaryCommand.toLowerCase());
                cmd?.execute(message);
            }
        }
    }
})

export default messageCreate;