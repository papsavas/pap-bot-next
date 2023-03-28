import { ApplicationCommandDataResolvable, CommandInteraction, Message, Snowflake } from "discord.js";
import { ActionCallback, ActionOptions } from "server/src/types/Actions";
import { Nullable } from "./Utilities";

export type PartialCommand = {
    command: string;
    data: ApplicationCommandDataResolvable;
    execute: (socket: Client...args: any) => Promise<unknown>;
}

export type Command =
    PartialCommand & {
        register: (guildId?: Snowflake) => Promise<void>;
        unregister: (guildId?: Snowflake) => Promise<void>
    }

//guild interaction, guild message, action event
export type CommandSource<T extends keyof ActionOptions> = CommandInteraction | Message | ActionOptions[T]

type CommandHandlerOutput<T extends keyof ActionOptions> = {
    res: Nullable<ActionOptions[T]>;
    callback?: ActionCallback<T>
}
export type CommandHandler<T extends keyof ActionOptions> = (source: CommandSource<T>) => Promise<CommandHandlerOutput<T>>