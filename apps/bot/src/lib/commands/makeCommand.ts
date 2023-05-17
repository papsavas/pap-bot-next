import { RESTPostAPIApplicationGuildCommandsJSONBody, Snowflake } from "discord.js";
import { Command, CommandOptions } from "../../../types/Command";
import { deleteCommand, getCommands, registerCommand } from "./rest";

export const makeCommand = (command: CommandOptions): Command => {
    return {
        ...command,
        register: async (guildId?: Snowflake) => {
            const res = await registerCommand({
                guildId,
                body: command.data as RESTPostAPIApplicationGuildCommandsJSONBody,
            });
            console.log(`registered command ${res?.name} for ${res.guild_id ?? "global manager"}`)
        },
        delete: async (guildId?: Snowflake) => {
            const commands = await getCommands({ guildId });
            const cmd = commands?.find(c => c.name === command.name)
            if (!cmd)
                return console.error(`Command ${command.name} could not be fetched for deletion`)
            await deleteCommand({ commandId: cmd.id, guildId });
            console.log(`deleted command ${cmd.name} for ${guildId ?? "global manager"}`)
        }
    };
}