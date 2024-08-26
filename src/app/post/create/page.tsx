'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreatePostPage() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const router = useRouter();

  useEffect(() => {
    async function checkAuthorization() {
      const currentUser = await fetch('/api/user').then((res) => res.json());
      if (!currentUser?.loggedIn) {
        router.push('/user/login');
      }
    }
    checkAuthorization();
  }, [router]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch('/api/post/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, body }),
    });

    if (response.ok) {
      const newPost = await response.json();
      localStorage.setItem('newPost', JSON.stringify(newPost));
      router.push(`/post/${newPost.id}?created=true`);
    } else {
      console.error('Failed to create post');
    }
  };

  return (
    <div>
      <h1>Create a New Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="body">Body:</label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}
