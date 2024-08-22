import Link from 'next/link';
import { getPosts } from '../../lib/data';

export default async function PostsPage() {
  const posts = await getPosts();
  return (
    <div>
      <h1>Posts with App Route</h1>
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
