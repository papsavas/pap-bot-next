import { db } from "database";
import { values } from "utils/values";
import { makeEvent } from "../utils/events/makeEvent";

const guildCreate = makeEvent({
    event: "guildCreate",
    async execute(guild) {
        const { id, name, iconURL, ownerId } = guild;
        console.log(`joined ${guild.name} guild`);
        await db.guild.create({
            data: {
                id, name, icon: iconURL(),
                prefix: {
                    create: {
                        userId: ownerId,
                        prefix: values.defaultPrefix
                    }
                }
            }
        })
    },
})

export default guildCreate;