import express, { RequestHandler } from 'express';
import { bot } from '.';
import { guildsRouter } from './routes/guilds';


export const BOT_PORT = 4040;

export const server = express();

const clientMiddleware: RequestHandler = (req, res, next) => {
    req.app.locals.client = bot;
    next();
}

server.use(clientMiddleware)
server.use(guildsRouter);


