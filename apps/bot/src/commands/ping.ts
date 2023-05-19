import { ApplicationCommandType } from "discord.js";
import { Command } from "../lib/commands/Command";


const pingCommand = new Command({
    data: {
        name: "ping",
        description: "Returns a `pong` response",
        type: ApplicationCommandType.ChatInput,
    },
    execute: async ({ reply }) => {
        reply({ content: "Pong", ephemeral: true })
    }
})

export const { name, data } = pingCommand

export default pingCommand;