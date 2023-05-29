import { currentUser } from '@clerk/nextjs';
import { NextRequest, NextResponse } from 'next/server';
import { getGuilds } from '../../../utils/getGuild';
import { getDiscordId } from '../../../utils/user';

export async function GET(request: NextRequest) {
	const currUser = await currentUser();
	if (!currUser) {
		return NextResponse.error();
	}
	const { body, status } = await getGuilds(getDiscordId(currUser!));
	if (status === 200) return NextResponse.json(body);
	return NextResponse.error();
}
