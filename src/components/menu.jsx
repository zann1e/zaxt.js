import Link from 'next/link';
import { cookies } from 'next/headers';
import { unsealData } from 'iron-session';

async function getSession() {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get('iron-session/');

  if (sessionCookie) {
    try {
      const session = await unsealData(sessionCookie.value, {
        password: process.env.IRON_SESSION_PASSWORD,
      });
      return session.loggedIn ? true : false;
    } catch {
      return false;
    }
  }

  return false;
}

export default async function Menu() {
  const isLoggedIn = await getSession();

  return (
    <div>
      <ul className="menu">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/albums">Albums</Link>
        </li>
        <li>
          <Link href="/posts">Posts</Link>
        </li>
        <li>
          <Link href="/users">Users</Link>
        </li>
        {isLoggedIn ? (
          <>
            <li>
              <Link href="/user/profile">Profile</Link>
            </li>
            <li>
              <Link href="/user/logout">Logout</Link>
            </li>
          </>
        ) : (
          <li>
            <Link href="/user/login">Login</Link>
          </li>
        )}
      </ul>
    </div>
  );
}
