import { ApplicationCommandData, ApplicationCommandType, ChatInputCommandInteraction } from "discord.js";
import { makeCommand } from "../utils/commands/makeCommand";

const name = "ping";

export const data = {
    name,
    description: "Returnsaaa `pong` response",
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