import { currentUser } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { getGuilds } from "../../../utils/getGuild";

export async function GET(request: NextRequest) {
    const currUser = await currentUser();
    if (!currUser) {
        return NextResponse.error();
    }
    const memberId = currUser!.externalAccounts[0].externalId
    const { body, status } = await getGuilds(memberId);
    if (status === 200)
        return NextResponse.json(body);
    return NextResponse.error();

}