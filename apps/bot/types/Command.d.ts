import { ApplicationCommandDataResolvable, CommandInteraction, Message, Snowflake } from "discord.js";

export type PartialCommand = {
    command: string;
    data: ApplicationCommandDataResolvable;
    execute: (...args: any) => Promise<unknown>;
}

export type Command =
    PartialCommand & {
        register: (guildId?: Snowflake) => Promise<void>;
        unregister: (guildId?: Snowflake) => Promise<void>
    }

export type CommandSource = CommandInteraction | Message
type CommandHandlerOutput = void
export type CommandHandler = (source: CommandSource) => Promise<CommandHandlerOutput>