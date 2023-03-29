import { db } from "database";
import { NextResponse } from "next/server";
import { parse } from "node:url";

export async function GET(request: Request) {
    const { guildId } = parse(request.url, true).query
    const prefix = (await db.prefix.findFirstOrThrow({ where: { guildId } })).value;
    return NextResponse.json({ prefix: prefix });
}
