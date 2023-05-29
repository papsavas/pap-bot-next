import { Prisma } from '@prisma/client';
import { makeScript } from './makeScript';

export const fetchPrefixes = makeScript(
	(data: Prisma.PrefixFindManyArgs, prisma) => prisma.prefix.findMany(data)
);

export const upsertPrefix = makeScript(
	(data: Prisma.PrefixUpsertArgs, prisma) => prisma.prefix.upsert(data)
);
