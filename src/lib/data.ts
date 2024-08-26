'use server';

import { Album, Comment, Post, Photo, User } from './types';
export async function getPosts(): Promise<Post[]> {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    const data = await response.json();
    return data as Post[];
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export async function getPost(postId: number): Promise<Post> {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}`,
    );
    const data = await response.json();
    return data as Post;
  } catch (error) {
    console.error(`Error fetching post with id ${postId}:`, error);
    throw error;
  }
}

export async function getComments(postId: number): Promise<Comment[]> {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
    );

    const data = await response.json();
    return data as Comment[];
  } catch (error) {
    console.error(`Error fetching comments for post with id ${postId}:`, error);
    throw error;
  }
}

export const getAlbums = async (): Promise<Album[]> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/albums');

  if (!response.ok) {
    throw new Error('Failed to fetch albums');
  }

  const albums: Album[] = await response.json();
  return albums;
};

export const getPhotos = async (albumId: number): Promise<Photo[]> => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/albums/${albumId}/photos`,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch photos');
  }

  const photos: Photo[] = await response.json();
  return photos;
};

export const getPhoto = async (photoId: number): Promise<Photo> => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/photos/${photoId}`,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch photo');
  }

  const photo: Photo = await response.json();
  return photo;
};

export async function getUsers(): Promise<User[]> {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');

  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }

  const users: User[] = await response.json();
  return users;
}

export async function getUser(userId: number): Promise<User> {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`,
  );

  const user: User = await response.json();
  return user;
}

export async function getUserPosts(userId: number): Promise<Post[]> {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}/posts`,
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch posts for user with ID: ${userId}`);
  }

  const posts: Post[] = await response.json();
  return posts;
}

export async function createPost(userId: number, title: string, body: string) {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, title, body }),
  });

  if (!response.ok) {
    throw new Error('Failed to create post');
  }

  const post = await response.json();
  return post;
}
