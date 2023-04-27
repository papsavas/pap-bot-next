import { Prisma } from "@prisma/client";
import { makeScript } from "./makeScript";

export const createGuild = makeScript((data: Prisma.GuildCreateInput, prisma) =>
    prisma.guild.create({ data })
)