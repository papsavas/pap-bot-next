import { ApplicationCommandType, ChatInputCommandInteraction } from "discord.js";
import { makeCommand } from "../utils/commands/makeCommand";

const name = "ping";

const pingCommand = makeCommand({
    name,
    data: {
        name,
        description: "Returns a `pong` response",
        type: ApplicationCommandType.ChatInput,

    },
    execute: async (command: ChatInputCommandInteraction) => {
        await command.reply("Pong");
    }
})

export default pingCommand;