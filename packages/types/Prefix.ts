import { z } from "zod";

export const prefixObject = z.object({
    guildId: z.string(),
    userId: z.string(),
    prefix: z.string()
});

export const prefixWithoutGuildIdObject = prefixObject.omit({ guildId: true })

export const prefixPathParams = z.object({
    guildId: z.string()
})

export type Prefix = z.infer<typeof prefixObject>