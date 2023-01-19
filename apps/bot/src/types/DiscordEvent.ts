import { ClientEvents } from "discord.js";

export type DiscordEvent<T extends keyof ClientEvents> = {
    name: T,
    execute: (...args: ClientEvents[T]) => Promise<unknown>,
}

