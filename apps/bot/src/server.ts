import { createExpressEndpoints } from "@ts-rest/express";
import { Client } from "discord.js";
import express from "express";
import { contract } from "http-contract";
import { bot, cache } from ".";
import { GuildCache } from "../types/GuildSettings";
import { prefixRouter } from "./routes/prefix";

//enhance request Type
declare global {
    namespace Express {
        export interface Request {
            bot: Client;
            cache: GuildCache;
        }
    }
}

export const BOT_PORT = 4040;

export const app = express()

//add client and cache to request object
app.use((req, res, next) => {
    req.bot = bot;
    req.cache = cache;
    next();
});

createExpressEndpoints(contract.prefix, prefixRouter, app, { logInitialization: true });


