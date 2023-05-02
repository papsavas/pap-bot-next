import { upsertGuild } from "database";
import { values } from "utils/values";
import client from "./client";

const bot = await client(['Guilds'], []);

bot.on("ready", async (client) => {
    for (const guild of client.guilds.cache.values()) {
        const { id, name, ownerId } = guild;
        const icon = guild.iconURL();
        await upsertGuild({
            where: { id },
            create: {
                id,
                name,
                icon,
                prefix: {
                    create: {
                        userId: ownerId,
                        prefix: values.defaultPrefix
                    }
                }
            },
            update: {
                id,
                name,
                icon
            }
        })
        console.log(`updated ${name} guild in db`);

    }
    process.exit(0);
})

