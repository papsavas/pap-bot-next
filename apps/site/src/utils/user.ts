import { User as serverUser } from '@clerk/nextjs/server';
import { UserResource as clientUser } from '@clerk/types';

export const getDiscordId = (user: serverUser | clientUser) => {
	const acc = user.externalAccounts[0];
	return 'externalId' in acc ? acc.externalId : acc.providerUserId;
};
