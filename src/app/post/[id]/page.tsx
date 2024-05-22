import { getPost, getPosts, getComments } from '../../../lib/data';

export default async function PostPage({ params }: { params: { id: number } }) {
  const post = await getPost(params.id);
  const comments = await getComments(params.id);

  return (
    <div>
      <h1>{post.title}</h1>
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
    </div>
  );
}
