import { bold, italic, spoiler } from "discord.js";

export const warnings = (commandName: string) => ({
    only: {
        guild: `This command is guild only`,
        messageContext: `This is a context menu command. *Right click => Apps => ${commandName}* on a message to use`,
        userContext: `This is a context menu command. *Right click => Apps => ${commandName}* on a user to use`,
        slashCommand: `This is a slash command. Type /${commandName} to use it`
    },
    closedDms: `Your DMs for this guild are closed. ${bold(italic(`Server name dropdown => Privacy Settings => Direct Messages ✅`) + " After, you'll need to retry this command")}
    ${spoiler("Tip: Once a DM channel between us is established you can close them again everywhere")}`
}) as const