import { ApplicationCommandData, ApplicationCommandType, ChatInputCommandInteraction } from "discord.js";
import { makeCommand } from "../lib/commands/makeCommand";

const name = "ping";

export const data = {
    name,
    description: "Returns a `pong` response",
    type: ApplicationCommandType.ChatInput,

} satisfies ApplicationCommandData;

const pingCommand = makeCommand({
    name,
    data,
    execute: async (command: ChatInputCommandInteraction) => {
        await command.reply("Pong");
    }
})

export default pingCommand;