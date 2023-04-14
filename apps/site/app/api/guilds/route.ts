import { currentUser } from "@clerk/nextjs/app-beta";
import { NextRequest, NextResponse } from "next/server";
import { tsRest } from "../../lib/ts-rest";

export async function GET(request: NextRequest) {
    const currUser = await currentUser();
    if (!currUser) {
        return NextResponse.error();
    }
    const memberId = currUser!.externalAccounts[0].externalId
    const { body, status } = await tsRest.guilds.getGuilds({ query: { memberId } });
    if (status === 200)
        return NextResponse.json(body);
    return NextResponse.error();

}