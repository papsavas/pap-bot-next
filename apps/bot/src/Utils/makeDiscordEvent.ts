import { ClientEvents, DiscordEvent } from "../types/DiscordEvent";

export const makeEvent = <K extends keyof ClientEvents>(event: DiscordEvent<K>) => {
    return event;
}