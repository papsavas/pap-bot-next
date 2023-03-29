import { db } from "database";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const guilds = await db.guild.findMany();
    return NextResponse.json({ guilds });
}