import { createExpressEndpoints } from "@ts-rest/express";
import { Client } from "discord.js";
import express from "express";
import { contract } from "http-contract";
import { bot, cache } from "..";
import { Cache } from "../../types/GuildSettings";
import { guildsRouter } from "./routes/guilds";
import { prefixRouter } from "./routes/prefix";

//enhance request Type
declare global {
    namespace Express {
        export interface Request {
            bot: Client;
            cache: Cache;
        }
    }
}

export const app = express();

app.use(express.json());

//add client and cache to request object
app.use((req, res, next) => {
    req.bot = bot;
    req.cache = cache;
    next();
});

createExpressEndpoints(contract, {
    guilds: guildsRouter,
    prefix: prefixRouter
}, app, { logInitialization: true });