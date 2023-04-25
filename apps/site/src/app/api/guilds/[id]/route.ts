import { NextRequest, NextResponse } from "next/server";
import { getGuild } from "../../../../utils/getGuild";

export async function GET(request: NextRequest, { params }: SegmentProps) {
    const { body, status } = await getGuild(params.id)
    if (status === 200)
        return NextResponse.json(body);
    return NextResponse.error();
}
