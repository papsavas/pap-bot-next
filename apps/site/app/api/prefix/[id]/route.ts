import { NextRequest, NextResponse } from "next/server";
import { tsRest } from "../../../lib/ts-rest";

export async function GET(request: NextRequest, { params }: Params) {
    const data = await tsRest.prefix.getPrefix({ params: { guildId: params.id } });
    if (data.status === 400)
        return NextResponse.error();
    return NextResponse.json({ data });
}