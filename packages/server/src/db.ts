import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
    log: ['info', 'warn', 'error'],
});

export const db = {
    guild: prisma.guild,
    prefix: prisma.prefix,
    reactionNotifications: prisma.reactionNotifications
}