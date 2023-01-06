import { PrismaClient } from "@prisma/client";

export const serverFunc = () => "Hello from server"

const prisma = new PrismaClient();

prisma.guild.findMany().then(r => console.table(r))