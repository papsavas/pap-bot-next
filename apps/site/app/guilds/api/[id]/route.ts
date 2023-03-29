import { db, Guild } from "database";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const guildId = params.id
    if (!guildId) return NextResponse.error();
    let guild;
    try {
        guild = await db.guild.findFirstOrThrow({
            where: { id: guildId }, include: { prefix: true }
        })
    } catch (error) {
        return NextResponse.error()
    }
    return NextResponse.json(guild satisfies Guild)
}