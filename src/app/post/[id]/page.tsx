import { getPost, getComments, getUser } from '../../../lib/data';
import Link from 'next/link';

export default async function PostPage({ params }: { params: { id: number } }) {
  const post = await getPost(params.id);
  const comments = await getComments(params.id);
  const user = await getUser(post.userId);

  return (
    <>
      <h1>{post.title}</h1>
      <h2>
        By: <Link href={`/user/${user.id}`}>{user.name}</Link>
      </h2>
      <p>{post.body}</p>
      <h2>Comments</h2>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <a href={`mailto:${comment.email}`}>{comment.name}</a>:{' '}
            <pre>{comment.body} </pre>
          </li>
        ))}
      </ul>
    </>
  );
}
