import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { unsealData } from 'iron-session';
import { getUser, getUserPosts } from '../../../lib/data';
import { SessionData } from '../../../lib/types';
import Link from 'next/link';

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

  const posts = await getUserPosts(session.userId);

  return (
    <div>
      <h1>User Profile</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/post/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
