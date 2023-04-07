import { db } from "database";
import { makeEvent } from "../utils/makeEvent";

const guildDelete = makeEvent({
    event: "guildDelete",
    async execute(guild) {
        console.log(`left ${guild.name} guild`);
        await db.guild.delete({ where: { id: guild.id }, include: { prefix: true } })
    },
})

export default guildDelete;