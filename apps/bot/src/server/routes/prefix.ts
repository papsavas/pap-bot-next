import { initServer } from "@ts-rest/express";
import { contract } from "http-contract";
import { prefixWithoutGuildIdObject } from "types";

const s = initServer();

export const prefixRouter = s.router(contract.prefix, {
    getPrefix: async ({ req, params }) => {
        const prefix = req.cache.prefix.get(params.guildId);
        if (!prefix) return {
            status: 400,
            body: { message: "Bad Request" }
        }
        return {
            status: 200,
            body: {
                ...prefix,
                guildId: params.guildId
            }
        }
    },
    putPrefix: async ({ req, body, params }) => {
        const prefixCache = req.cache.prefix;
        if (!prefixCache.has(params.guildId) || !prefixWithoutGuildIdObject.safeParse(body).success) return {
            status: 400, body: { message: "Bad Request" }
        }
        prefixCache.set(params.guildId, {
            ...body
        })
        //TODO: update db
        return {
            status: 200,
            body: {
                message: "Success"
            }
        }
    }

})