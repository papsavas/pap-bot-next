import { NextRequest, NextResponse } from "next/server";
import { tsRest } from "../../lib/ts-rest";

export async function GET(request: NextRequest) {
    const { body, status } = await tsRest.guilds.getGuilds();
    if (status === 200)
        return NextResponse.json(body);
    return NextResponse.error();

}