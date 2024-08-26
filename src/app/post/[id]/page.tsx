'use client';

import { useSearchParams } from 'next/navigation';
import { getPost, getComments, getUser } from '../../../lib/data';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Post, Comment, User } from '../../../lib/types';
import { router } from 'next/client';

export default function PostPage({ params }: { params: { id: number } }) {
  let [post, setPost] = useState<Post>();
  let [comments, setComments] = useState<Comment[]>();
  let [user, setUser] = useState<User>();
  const searchParams = useSearchParams();
  const isNewPost = searchParams.get('created') === 'true';

  useEffect(() => {
    async function fetchData() {
      const postData = await getPost(params.id);
      setPost(postData);

      const commentsData = await getComments(params.id);
      setComments(commentsData);

      const userData = await getUser(postData.userId);
      setUser(userData);
    }

    fetchData();
  }, [params.id]);

  if (isNewPost) {
    return (
      <>
        <h1>New Post Created!</h1>
        <pre>{localStorage.getItem('newPost')}</pre>
      </>
    );
  }

  if (!post || !user) return <div>Loading...</div>;

  if (post && user) {
    return (
      <>
        <h1>{post.title}</h1>
        <h2>
          By: <Link href={`/user/${user.id}`}>{user.name}</Link>
        </h2>
        <p>{post.body}</p>
        <h2>Comments</h2>
        <ul>
          {comments?.map((comment) => (
            <li key={comment.id}>
              <a href={`mailto:${comment.email}`}>{comment.name}</a>:{' '}
              <pre>{comment.body}</pre>
            </li>
          ))}
        </ul>
      </>
    );
  }
}
