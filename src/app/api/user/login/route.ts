import { NextRequest, NextResponse } from 'next/server';
import { sealData } from 'iron-session';
import { getUsers } from '../../../../lib/data';

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();
  const users = await getUsers();

  const user = users.find((user) => user.email === email);

  if (!user || password !== 'qwerty') {
    return NextResponse.json(
      { error: 'Invalid email or password' },
      { status: 401 },
    );
  }

  const sessionData = { loggedIn: true, userId: user.id };
  const sealed = await sealData(sessionData, {
    password: process.env.IRON_SESSION_PASSWORD!,
  });

  const response = NextResponse.json({ message: 'Login successful', ok: true });
  response.cookies.set('iron-session/', sealed, { httpOnly: true, path: '/' });

  return response;
}
