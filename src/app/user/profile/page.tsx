import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { unsealData } from 'iron-session';
import { getUser } from '../../../lib/data';
import { SessionData } from '../../../lib/types';

export default async function UserProfile() {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get('iron-session/');

  if (!sessionCookie) {
    redirect('/user/login');
  }

  const session: SessionData = await unsealData(sessionCookie.value, {
    password: process.env.IRON_SESSION_PASSWORD!,
  });

  if (!session || !session.loggedIn) {
    redirect('/user/login');
  }

  const user = await getUser(session.userId);

  if (!user) {
    redirect('/user/login');
  }

  return (
    <div>
      <h1>User Profile</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}
