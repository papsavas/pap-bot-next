
import { Client } from 'discord.js';
import fastify, { FastifyPluginCallback } from 'fastify';
import { dirname, join } from "node:path";
import { fileURLToPath } from 'node:url';
import { importMappedDir } from 'utils/importDir';
import { bot } from '.';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const BOT_PORT = 4040;
export const server = fastify();

declare module 'fastify' {
    interface FastifyRequest {
        client: Client,
    }
}

server.decorateRequest("client", null);
server.addHook("onRequest", (req, res, done) => {
    req.client = bot;
    done();
});

const routes = await importMappedDir<FastifyPluginCallback>(
    join(__dirname, "routes"),
    (f => f.endsWith(".ts")
    ))

//register all plugins
for (const [name, file] of routes.entries())
    server.register(file, { prefix: name })


