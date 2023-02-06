import { prisma } from "../db";
import { makeServerAction } from "../utils/makeAction";

const prefixServerAction = makeServerAction({
    action: "prefix",
    async onEvent(socket, data, callback) {
        const { guildId: guild_id, value, userId } = data;
        try {
            const res = await prisma.prefix.update({
                where: { guild_id },
                include: { guild: true },
                data: {
                    value,
                    userId
                }
            });
            if (callback)
                await callback(data);

        } catch (error) {
            console.error(error);
        }

        return { socket, data }
    }
})

export default prefixServerAction;