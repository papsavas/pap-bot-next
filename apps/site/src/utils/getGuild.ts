import { cache } from "react";
import { tsRest } from "../lib/ts-rest";

export const getGuild = cache(
    (id: string) =>
        tsRest.guilds.getGuild({ params: { id } })
)

export const getGuilds = cache(
    (memberId?: string) =>
        tsRest.guilds.getGuilds({ query: { memberId } })

)
