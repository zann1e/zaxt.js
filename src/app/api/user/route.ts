import { NextRequest, NextResponse } from 'next/server';
import { unsealData } from 'iron-session';

export async function GET(request: NextRequest) {
  const cookie = request.cookies.get('iron-session/');

  if (!cookie) {
    return NextResponse.json({ error: 'No session found' }, { status: 401 });
  }

  const session = await unsealData(cookie.value, {
    password: process.env.IRON_SESSION_PASSWORD!,
  });

  return NextResponse.json(session);
}
