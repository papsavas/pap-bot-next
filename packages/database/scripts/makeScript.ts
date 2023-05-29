import { PrismaClient } from '@prisma/client';
import prismaClient from '../prisma';

export const makeScript = ((cb) =>
	(data, prisma = prismaClient) =>
		cb(data, prisma)) as <T, U>(
	cb: (data: T, prisma: PrismaClient) => U
) => (data: T, prisma?: PrismaClient) => U;
