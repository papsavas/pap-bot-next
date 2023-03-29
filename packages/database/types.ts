import { Prisma } from "@prisma/client";

export type Guild = Prisma.GuildGetPayload<{ include: Prisma.GuildInclude }>
export type Prefix = Prisma.PrefixGetPayload<false>;