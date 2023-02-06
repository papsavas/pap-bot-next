import { prisma } from "../db";
import { makeServerAction } from "../utils/makeAction";

const guildServerAction = makeServerAction({
    action: "guilds",
    async onEvent(socket, data) {
        data.guilds.forEach(async guild => await prisma.guild.upsert({
            where: { id: guild.id },
            update: {},
            create: {
                id: guild.id,
                icon: guild.icon!,
                name: guild.name,
                prefix: { create: { userId: guild.ownerId, value: "$" } }
            }
        }))
        return { socket, data }
    }
});

export default guildServerAction;

