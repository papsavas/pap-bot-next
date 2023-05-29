import { initContract } from '@ts-rest/core';
import { guildsContract } from './contracts/guilds';
import { prefixContract } from './contracts/prefix';

const c = initContract();

//TODO: use env
const BASE_URL = 'http://localhost';
export const BOT_PORT = 4040;
const SITE_PORT = 3000;
export const BOT_ENDPOINT = `${BASE_URL}:${BOT_PORT}` as const;
export const SITE_ENDPOINT = `${BASE_URL}:${SITE_PORT}` as const;

export const contract = c.router({
	prefix: prefixContract,
	guilds: guildsContract,
});
