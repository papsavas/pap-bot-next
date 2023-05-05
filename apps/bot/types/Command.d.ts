import { ApplicationCommandData, CommandInteraction, Message, Snowflake } from "discord.js";

export type PartialCommand = {
    name: string;
    data: ApplicationCommandData;
    execute: (...args: any) => Promise<unknown>;
}

export type Command =
    PartialCommand & {
        register: (guildId?: Snowflake) => Promise<void>;
        delete: (guildId?: Snowflake) => Promise<void>
    }

export type CommandSource = CommandInteraction | Message
type CommandHandlerOutput = void
export type CommandHandler = (source: CommandSource) => Promise<CommandHandlerOutput>