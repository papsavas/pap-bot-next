import { prisma } from "../db";
import { makeServerAction } from "../utils/makeAction";

const prefixServerAction = makeServerAction({
    action: "prefix",
    async onEvent(socket, data) {
        const { guildId: guild_id, value, userId } = data;
        const res = await prisma.prefix.update({
            where: { guild_id },
            data: {
                value,
                userId
            }
        });
        return { socket, data }
    }
})

export default prefixServerAction;