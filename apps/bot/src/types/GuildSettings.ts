import { Role } from "discord.js";

export type GuildSettings = {
    prefix: {
        value: string,
        userId: Role['id']
    };

}