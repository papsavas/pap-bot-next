import { initContract } from '@ts-rest/core';
import { prefixObject } from 'types';

const c = initContract();
const param = "guildId";


export const prefixContract = c.router({
    getPrefix: {
        description: "Get guilds prefix",
        method: "GET",
        path: "/prefix/:guildId",
        pathParams: {
            guildId: "guildId"
        },
        responses: {
            200: prefixObject,
        },
    },
    putPrefix: {
        description: "Edit guilds prefix",
        method: "PUT",
        contentType: "application/json",
        path: `/prefix/:${param}`,
        pathParams: {
            param
        },
        body: prefixObject.omit({ guildId: true }),
        responses: {
            200: prefixObject,
            400: c.response<{ message: string }>()
        },
    }
})