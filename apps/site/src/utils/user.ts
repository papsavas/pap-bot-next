import { User } from "@clerk/nextjs/server";
import { UserResource } from "@clerk/types/";

export const getDiscordId = (user: User | UserResource) =>
    user instanceof User ?
        user.externalAccounts[0].externalId :
        user.externalAccounts[0].providerUserId