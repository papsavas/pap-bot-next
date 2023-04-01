import express, { RequestHandler } from 'express';
import { dirname, join } from "node:path";
import { fileURLToPath } from 'node:url';
import { importDir } from 'utils';
import { bot } from '.';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const BOT_PORT = 4040;
export const server = express();

const clientMiddleware: RequestHandler = (req, res, next) => {
    req.app.locals.client = bot;
    next();
}

server.use(clientMiddleware);

const routes = await Promise.all(importDir<RequestHandler>(
    join(__dirname, "routes"),
    (f => f.endsWith(".ts"))
))
server.use(...routes);


