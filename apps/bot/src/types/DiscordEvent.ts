import { ClientEvents } from "discord.js";



export type DiscordEventFile = {
    name: keyof ClientEvents,
    execute: <K extends keyof ClientEvents> (...args: ClientEvents[K]) => Promise<unknown>,
}

export type { ClientEvents };

