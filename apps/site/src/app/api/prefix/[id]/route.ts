import { NextRequest, NextResponse } from "next/server";
import { prefixWithoutGuildIdObject } from "types/Prefix";
import { tsRest } from "../../../../lib/ts-rest";

export async function GET(request: NextRequest, { params }: SegmentProps) {
    const { body, status } = await tsRest.prefix.getPrefix({ params: { guildId: params.id } });
    if (status === 200)
        return NextResponse.json(body);
    return NextResponse.error();
}

export async function PUT(request: NextRequest, { params }: SegmentProps) {
    const body = await request.json();
    const parsedBody = prefixWithoutGuildIdObject.safeParse(body);
    if (!parsedBody.success)
        return NextResponse.json({}, { status: 400, statusText: "Bad Request" });

    const res = await tsRest.prefix.putPrefix({
        params: { guildId: params.id },
        body: parsedBody.data
    });

    if (res.status === 200)
        return NextResponse.json({}, { status: 200, statusText: "Success" })
    return NextResponse.json({}, { status: 500, statusText: "Bad Response" });
}