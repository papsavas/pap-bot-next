import { FastifyInstance, FastifyPluginOptions, FastifyRequest } from "fastify";
import { JSON, Prefix } from "types";
import { z } from "zod";

const schema = z.object({
    guildId: z.string(),
    userId: z.string(),
    value: z.string()
});

export default async function guildsRouter(fastify: FastifyInstance, options: FastifyPluginOptions) {
    fastify.patch("/", async (req: FastifyRequest<{ Body: JSON<Prefix> }>, res) => {
        const parsed = schema.safeParse(req.body);
        if (parsed.success) {

        }
        return res.status(400);
    })
}
