import { ApplicationCommandData, CommandInteraction, Message, Snowflake } from "discord.js";

export type CommandOptions = {
    name: string;
    data: ApplicationCommandData;
    execute: (source: CommandSource) => Promise<unknown>;
}

export type Command =
    CommandOptions & {
        register: (guildId?: Snowflake) => Promise<void>;
        delete: (guildId?: Snowflake) => Promise<void>
    }

export type CommandSource = CommandInteraction | Message
type CommandHandlerOutput = void
export type CommandHandler = (source: CommandSource) => Promise<CommandHandlerOutput>