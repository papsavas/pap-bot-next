import { NextRequest, NextResponse } from "next/server";
import { prefixObject } from "types";
import { tsRest } from "../../../lib/ts-rest";

export async function GET(request: NextRequest, { params }: Params) {
    const { body, status } = await tsRest.prefix.getPrefix({ params: { guildId: params.id } });
    if (status === 200)
        return NextResponse.json(body);
    return NextResponse.error();
}

export async function PUT(request: NextRequest, { params }: Params) {
    const body = await request.json();
    const parsedBody = prefixObject.omit({ guildId: true }).safeParse(body);
    if (!parsedBody.success) return NextResponse.error();
    const res = await tsRest.prefix.putPrefix({
        params: { guildId: params.id },
        body: parsedBody.data
    });
    if (res.status === 200)
        return NextResponse.json({ message: "Success" })
    return NextResponse.error();
}