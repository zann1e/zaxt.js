'use server';

import { cookies } from 'next/headers';
import { sealData } from 'iron-session';

export async function logoutUser() {
  const emptySession = await sealData(
    {},
    { password: process.env.IRON_SESSION_PASSWORD! },
  );
  const cookieStore = cookies();
  cookieStore.set('iron-session/', emptySession, { maxAge: -1 });
}
