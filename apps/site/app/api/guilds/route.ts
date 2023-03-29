import { db, Guild } from "database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const guilds = await db.guild.findMany();
    return NextResponse.json(guilds satisfies Guild[]);
}