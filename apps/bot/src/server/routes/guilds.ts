import { initServer } from "@ts-rest/express";
import { Guild as DiscordGuild, Snowflake } from "discord.js";
import { contract } from "http-contract";
import { Guild } from "types";

const guildHasMember = (g: DiscordGuild, memberId: Snowflake) =>
    g.members.fetch(memberId).catch(() => false)

const s = initServer();
export const guildsRouter = s.router(contract.guilds, {
    getGuilds: async ({ req, query }) => {
        const guildCache = req.bot.guilds.cache.clone();
        const { memberId } = query;
        if (memberId)
            for (const [gid, g] of guildCache)
                if (!await guildHasMember(g, memberId))
                    guildCache.delete(gid);

        return {
            status: 200,
            body: guildCache.toJSON() as unknown as Guild[]
        }
    },
    getGuild: async ({ req, params }) => {
        const guild = req.bot.guilds.cache.get(params.id);
        if (!guild)
            return { status: 400, body: { message: "Guild does not exist" } }
        return {
            status: 200,
            body: guild.toJSON() as unknown as Guild
        }
    }

})