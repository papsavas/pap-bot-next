import { ClientEvents } from "discord.js";
import { DiscordEvent } from "../../types/DiscordEvent";

export const makeEvent = <K extends keyof ClientEvents>(event: DiscordEvent<K>) => {
    return event;
}