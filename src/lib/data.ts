import { Post } from './types';
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
