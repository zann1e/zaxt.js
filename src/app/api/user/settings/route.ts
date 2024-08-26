import { NextRequest, NextResponse } from 'next/server';
import { getIronSession, sealData } from 'iron-session';
import { DarkModeSetting, SessionData } from '../../../../lib/types';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  const session: SessionData = await getIronSession(cookies(), {
    password: process.env.IRON_SESSION_PASSWORD!,
    cookieName: 'iron-session/',
  });

  if (!session.userId) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const { darkMode } = await req.json();

  if (!Object.values(DarkModeSetting).includes(darkMode)) {
    return new NextResponse('Invalid dark mode setting', { status: 400 });
  }

  session.darkMode = darkMode;
  const sealed = await sealData(session, {
    password: process.env.IRON_SESSION_PASSWORD!,
  });

  const response = NextResponse.json({
    message: 'Settings saved',
    status: 200,
    ok: true,
  });
  response.cookies.set('iron-session/', sealed, { httpOnly: true, path: '/' });

  return response;
}
