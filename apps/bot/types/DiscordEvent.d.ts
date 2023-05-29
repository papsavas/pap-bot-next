import { ClientEvents } from 'discord.js';

export type DiscordEvent<T extends keyof ClientEvents> = {
	event: T;
	execute: (...args: ClientEvents[T]) => Promise<unknown>;
};
