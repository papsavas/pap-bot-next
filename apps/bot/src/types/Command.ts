import { ApplicationCommandDataResolvable, Snowflake } from "discord.js";
import { ClientSocket } from "server";

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