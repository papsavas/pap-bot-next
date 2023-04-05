import { NextRequest, NextResponse } from "next/server";
import { tsRest } from "../../../lib/ts-rest";

export async function GET(request: NextRequest, { params }: Params) {
    const guildId = params.id
    if (!guildId) return NextResponse.error();
    const data = await tsRest.guilds.getGuild({ params });
    if (data.status === 400)
        return NextResponse.error();
    return NextResponse.json({ data })
}

export async function PUT(request: NextRequest, { params }: Params) {
    const guildId = params.id;
    if (!guildId) return NextResponse.error();
    console.log(await request.json());
    //TODO: update
    return NextResponse.json({ message: "Successful Update" })
}