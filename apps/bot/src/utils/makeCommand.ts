import { Snowflake } from "discord.js";
import { bot } from "..";
import deleteCommand from "../scripts/deleteCommand";
import createCommand from "../scripts/registerCommand";
import { Command, PartialCommand } from "../types/Command";

export const makeCommand = (command: PartialCommand): Command => {
    return {
        ...command,
        register: async (guildId?: Snowflake) => {
            const res = await createCommand(bot.application?.commands!, command.data, guildId)
            console.log(`registered command ${res?.name} for ${res?.guild?.name ?? "global manager"}`)
        },
        unregister: async (guildId?: Snowflake) => {
            const commands = await bot.application?.commands.fetch(undefined, { guildId });
            const cmd = commands?.find(c => c.name === command.command)
            if (!cmd)
                return console.error(`Command ${command.command} could not be fetched for deletion`)
            const res = await deleteCommand(bot.application?.commands!, cmd.id, guildId);
            console.log(`deleted command ${res?.name} for ${res?.guild?.name ?? "global manager"}`)
        }
    };
}