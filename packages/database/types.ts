import { Prisma } from "@prisma/client";

export type DBGuild = Prisma.GuildGetPayload<{ include: Prisma.GuildInclude }>
export type DBPrefix = Prisma.PrefixGetPayload<false>;