import { Prisma } from "@prisma/client";
import { makeScript } from "./makeScript";

export const fetchReactionNotifications = makeScript((data: Prisma.ReactionNotificationsFindManyArgs, prisma) =>
    prisma.reactionNotifications.findMany(data))

export const deleteReactionNotifications = makeScript((data: Prisma.ReactionNotificationsDeleteArgs, prisma) =>
    prisma.reactionNotifications.delete(data)
)

export const upsertReactionNotifications = makeScript((data: Prisma.ReactionNotificationsUpsertArgs, prisma) =>
    prisma.reactionNotifications.upsert(data)
)

