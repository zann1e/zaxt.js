import Link from 'next/link';
import { getUser, getUserPosts } from '../../../lib/data';

export default async function UserPage({
  params,
}: {
  params: { userId: number };
}) {
  const userId = params.userId;
  const user = await getUser(userId);
  const posts = await getUserPosts(userId);

  return (
    <>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      <h2>Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/post/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
