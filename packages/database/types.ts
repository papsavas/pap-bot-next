import { Prisma } from '@prisma/client';

export type DBGuild = Prisma.GuildGetPayload<{ include: Prisma.GuildInclude }>;
export type DBPartialGuild = Prisma.GuildGetPayload<{}>;
export type DBPrefix = Prisma.PrefixGetPayload<{}>;
export type DBReactionNotifications =
	Prisma.ReactionNotificationsGetPayload<{}>;
