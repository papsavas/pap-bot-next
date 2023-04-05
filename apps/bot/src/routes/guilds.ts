import { initServer } from "@ts-rest/express";
import { contract } from "http-contract";
import { Guild } from "types";

const s = initServer();
export const guildsRouter = s.router(contract.guilds, {
    getGuilds: async ({ req }) => {
        const guilds = req.bot.guilds.cache;
        return {
            status: 200,
            body: guilds.toJSON() as unknown as Guild[]
        }
    },
    getGuild: async ({ req, params }) => {
        const guild = req.bot.guilds.cache.get(params.id);
        if (!guild)
            return { status: 400, body: { message: "Guild does not exist" } }
        return {
            status: 200,
            body: guild.toJSON() as unknown as Guild
        }
    }

})