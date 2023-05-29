import { z } from 'zod';

export const guildMemberIdQuery = z.object({
	memberId: z.string().optional(),
});

export const guildObject = z.object({
	id: z.string(),
	ownerId: z.string(),
	channels: z.string().array(),
	iconURL: z.string().nullable(),
	name: z.string(),
});

export type Guild = z.infer<typeof guildObject>;
