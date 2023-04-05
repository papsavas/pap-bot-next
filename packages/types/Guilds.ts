import { z } from "zod";

export const guildObject = z.object({
    id: z.string(),
    ownerId: z.string(),
    channels: z.string().array(),
    icon: z.string().nullable(),
    name: z.string()
});

//TODO: check against JSON discordjs Guild
export type Guild = z.infer<typeof guildObject>