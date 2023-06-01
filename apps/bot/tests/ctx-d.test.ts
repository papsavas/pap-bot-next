import { DBPrefix, DBReactionNotifications } from 'database';
import { PapMap } from 'papmap';
import { assertType, describe, it } from 'vitest';
import { ctx } from '../src/ctx';

describe('Context Should respect DB types', () => {
	it('Reaction Notifications', () => {
		assertType<PapMap<string, DBReactionNotifications>>(
			ctx.reactionNotifier
		);
	});
	it('Prefix', () => {
		assertType<PapMap<string, Omit<DBPrefix, 'guildId'>>>(
			ctx.prefix
		);
	});
});
