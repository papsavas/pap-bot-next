import { ApplicationCommandType } from "discord.js";
import { makeCommand } from "../utils/commands/makeCommand";

const prefixCommand = makeCommand({
    command: "prefix",
    data: {
        name: "prefix",
        description: "prefix for manual commands",
        type: ApplicationCommandType.ChatInput
    },
    execute: async () => {

    }

})

export default prefixCommand;