import { NextRequest, NextResponse } from "next/server";
import { Guild, JSON } from "types";

export async function GET(request: NextRequest) {
    try {
        const res = await fetch("http://localhost:4040/guilds", { method: "GET" });
        const guilds = await res.json()
        return NextResponse.json(guilds satisfies JSON<Guild[]>);

    } catch (error) {
        console.log(error);

    }
}