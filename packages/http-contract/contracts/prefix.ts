import { initContract } from '@ts-rest/core';
import { prefixObject } from 'types';
import { prefixPathParams, prefixWithoutGuildIdObject } from 'types/Prefix';

const c = initContract();

export const prefixContract = c.router({
	getPrefix: {
		description: 'Get guilds prefix',
		method: 'GET',
		path: '/prefix/:guildId',
		pathParams: {
			guildId: 'guildId',
		},
		responses: {
			200: prefixObject,
		},
	},
	putPrefix: {
		description: 'Edit guilds prefix',
		method: 'PUT',
		contentType: 'application/json',
		path: `/prefix/:guildId`,
		pathParams: prefixPathParams,
		body: prefixWithoutGuildIdObject,
		responses: {
			200: c.response<{ message: string }>(),
			400: c.response<{ message: string }>(),
		},
	},
});
