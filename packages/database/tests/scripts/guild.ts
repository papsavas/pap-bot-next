import { Prisma } from "@prisma/client";
import prisma from "../../prisma";

//! Currently imports real client, writes in DB
export const createGuild = async (data: Prisma.GuildCreateInput) => {
    return await prisma.guild.create({ data });
}
