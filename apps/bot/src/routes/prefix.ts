import { FastifyInstance, FastifyPluginOptions, FastifyRequest } from "fastify";
import { JSON, Prefix, prefixObject } from "types";




export default async function guildsRouter(fastify: FastifyInstance, options: FastifyPluginOptions) {
    fastify.patch("/", async (req: FastifyRequest<{ Body: JSON<Prefix> }>, res) => {
        const parsed = prefixObject.safeParse(req.body);
        if (parsed.success) {

        }
        return res.status(400);
    })
}
