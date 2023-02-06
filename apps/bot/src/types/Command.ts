import { ApplicationCommandDataResolvable, CommandInteraction, Message, Snowflake } from "discord.js";
import { ClientSocket } from "server";
import { ActionOptions } from "server/src/types/Actions";

export type PartialCommand = {
    command: string;
    data: ApplicationCommandDataResolvable;
    execute: (socket: ClientSocket, ...args: any) => Promise<unknown>;
}

export type Command =
    PartialCommand & {
        register: (guildId?: Snowflake) => Promise<void>;
        unregister: (guildId?: Snowflake) => Promise<void>
    }

//guild interaction, guild message, action event
export type CommandSource<T extends keyof ActionOptions> = CommandInteraction<"cached" | "raw"> | Message<true> | ActionOptions[T]