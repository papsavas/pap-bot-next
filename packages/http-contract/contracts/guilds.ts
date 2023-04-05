import { initContract } from '@ts-rest/core';
import { guildObject } from 'types';

const c = initContract();
const paramId = "id";


export const guildsContract = c.router({
    getGuilds: {
        description: "Get guilds",
        method: "GET",
        path: "/guilds",
        responses: {
            200: guildObject.array(),
        },
    },
    getGuild: {
        description: "Get guild",
        method: "GET",
        path: `/guilds/:${paramId}`,
        pathParams: { id: paramId },
        responses: {
            200: guildObject,
        },
    }
})