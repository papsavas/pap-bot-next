import { ApplicationCommandType, ChatInputCommandInteraction } from "discord.js";
import { makeCommand } from "../utils/commands/makeCommand";

const pingCommand = makeCommand({
    name: "ping",
    data: {
        name: "ping",
        description: "Returns a `pong` response",
        type: ApplicationCommandType.ChatInput,

    },
    execute: async (command: ChatInputCommandInteraction) => {
        await command.reply("Pong");
    }
})

export default pingCommand;