export const resolveReactionNotificationId =
    ({ guildId, userId, targetId }: { guildId: string, userId: string, targetId: string }) =>
        `${guildId}-${userId}<-${targetId}`;
