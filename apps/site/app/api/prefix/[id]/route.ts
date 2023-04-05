import { NextRequest, NextResponse } from "next/server";
import { tsRest } from "../../../lib/ts-rest";

export async function GET(request: NextRequest, { params }: Params) {
    const { body, status } = await tsRest.prefix.getPrefix({ params: { guildId: params.id } });
    if (status === 200)
        return NextResponse.json(body);
    return NextResponse.error();
}