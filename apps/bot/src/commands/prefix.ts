import { ApplicationCommandType } from "discord.js";
import { makeCommand } from "../utils/commands/makeCommand";

export default makeCommand({
    command: "prefix",
    data: {
        name: "prefix",
        description: "prefix for manual commands",
        type: ApplicationCommandType.ChatInput
    },
    execute: async () => {

    }

})