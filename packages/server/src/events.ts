import { DiscordEventFile } from "@bot/src/types/DiscordEvent";
import { readdirSync } from "node:fs";
export const eventFiles: DiscordEventFile[] = readdirSync("@bot/src/Events/")
    .map(file => require(`@bot/src/Events/Impl/${file}`).default);

