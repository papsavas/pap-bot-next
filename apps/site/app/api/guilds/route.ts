import { NextRequest, NextResponse } from "next/server";
import { tsRest } from "../../lib/ts-rest";

export async function GET(request: NextRequest) {
    try {
        const data = await tsRest.guilds.getGuilds();
        return NextResponse.json({ data });

    } catch (error) {
        console.log(error);

    }
}