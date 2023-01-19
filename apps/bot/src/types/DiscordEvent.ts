import { ClientEvents } from "discord.js";
import { ClientSocket } from "server";

export type DiscordEvent<T extends keyof ClientEvents> = {
    event: T,
    execute: (socket: ClientSocket, ...args: ClientEvents[T]) => Promise<unknown>,
}

