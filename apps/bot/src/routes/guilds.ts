import { FastifyInstance, FastifyPluginOptions } from "fastify";

export default async function guildsRouter(fastify: FastifyInstance, options: FastifyPluginOptions) {
    fastify.get("/", async (req, res) => {
        const client = req.client
        if (!client || !client.isReady()) return res.status(500);
        return res
            .status(200)
            .serialize(client.guilds.cache)
    })
}
