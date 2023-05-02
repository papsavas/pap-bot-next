import { Prisma } from "@prisma/client";
import { makeScript } from "./makeScript";

export const fetchReactNotifications = makeScript((args: Prisma.ReactionNotificationsFindManyArgs, prisma) =>
    prisma.reactionNotifications.findMany(args))