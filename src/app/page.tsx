import { getPosts } from '../lib/data';
import Link from 'next/link';

export default async function Home() {
  const posts = await getPosts();
  const randomPosts = posts.sort(() => Math.random() - 0.5).slice(0, 5); // Randomly select 5 posts

  return (
    <>
      <h1>Homepage</h1>
      <h2>Random Posts</h2>
      <ul>
        {randomPosts?.map((post) => (
          <li key={post?.id}>
            <Link href={`/post/${post?.id}`}>{post?.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
