import { db, Guild } from "database";
import { NextRequest, NextResponse } from "next/server";

type Params = { params: { id: string } };

export async function GET(request: NextRequest, { params }: Params) {
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

export async function PUT(request: NextRequest, { params }: Params) {
    const guildId = params.id;
    if (!guildId) return NextResponse.error();
    console.log(await request.json());
    return NextResponse.json({ message: "Successful Update" })
}