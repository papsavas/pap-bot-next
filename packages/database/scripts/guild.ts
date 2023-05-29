import { Prisma } from '@prisma/client';
import { makeScript } from './makeScript';

export const createGuild = makeScript((data: Prisma.GuildCreateArgs, prisma) =>
	prisma.guild.create(data)
);

export const upsertGuild = makeScript((data: Prisma.GuildUpsertArgs, prisma) =>
	prisma.guild.upsert(data)
);

export const deleteGuild = makeScript((data: Prisma.GuildDeleteArgs, prisma) =>
	prisma.guild.delete(data)
);
