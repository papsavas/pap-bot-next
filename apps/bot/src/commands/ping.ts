import { ApplicationCommandData, ApplicationCommandType } from "discord.js";
import { CommandSource } from "../../types/Command";
import SourceHandler from "../lib/SourceHandler";
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
    execute: async (source: CommandSource) => {
        return SourceHandler(source)
            .reply({ content: "Pong", ephemeral: true },)
    }
})

export default pingCommand;