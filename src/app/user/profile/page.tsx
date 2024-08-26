'use client';

import { getUser, getUserPosts } from '../../../lib/data';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Post, DarkModeSetting } from '../../../lib/types';

export default function UserProfile() {
  const [darkMode, setDarkMode] = useState<DarkModeSetting>(
    DarkModeSetting.AUTOMATIC,
  );
  const [message, setMessage] = useState<string | null>(null);
  const [user, setUser] = useState<User>();
  const [posts, setPosts] = useState<Post[]>();
  const router = useRouter();
  router.refresh();

  useEffect(() => {
    async function checkUser() {
      const currentUser = await fetch('/api/user').then((res) => res.json());

      if (!currentUser?.loggedIn) {
        router.push('/user/login');
      }

      const userData = await getUser(currentUser.userId);
      setUser(userData);

      const postsData = await getUserPosts(currentUser.userId);
      setPosts(postsData);

      setDarkMode(currentUser.darkMode);
    }
    checkUser();
  }, [router]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDarkMode(event.target.value as DarkModeSetting);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await fetch('/api/user/settings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ darkMode }),
    });

    if (response.ok) {
      setMessage('Settings saved!');
      router.refresh();
    } else {
      setMessage('Failed to save settings.');
    }
  };

  return (
    <div>
      <h1>User Profile</h1>
      <p>Name: {user?.name}</p>
      <p>Email: {user?.email}</p>
      <h2>Settings</h2>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Dark Mode</legend>
          <label>
            <input
              type="radio"
              name="darkMode"
              value={DarkModeSetting.AUTOMATIC}
              checked={darkMode === DarkModeSetting.AUTOMATIC}
              onChange={handleChange}
            />
            Automatic
          </label>
          <label>
            <input
              type="radio"
              name="darkMode"
              value={DarkModeSetting.OFF}
              checked={darkMode === DarkModeSetting.OFF}
              onChange={handleChange}
            />
            Off
          </label>
          <label>
            <input
              type="radio"
              name="darkMode"
              value={DarkModeSetting.ON}
              checked={darkMode === DarkModeSetting.ON}
              onChange={handleChange}
            />
            On
          </label>
        </fieldset>
        <button type="submit">Save Settings</button>
      </form>
      {message && <p>{message}</p>}
      <h1>Posts</h1>
      <ul>
        {posts?.map((post) => (
          <li key={post.id}>
            <Link href={`/post/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
