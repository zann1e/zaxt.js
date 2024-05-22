import { GetStaticProps } from 'next';
import Link from 'next/link';
import { Post } from '../../lib/types';
import { getPosts } from '../../lib/data';

interface PostsProps {
  posts: Post[];
}

const PostsPage: React.FC<PostsProps> = ({ posts }) => {
  return (
    <div>
      <h1>Posts with Pages Route</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/post/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getStaticProps: GetStaticProps<PostsProps> = async () => {
  const posts = await getPosts();
  return {
    props: {
      posts,
    },
  };
};

export default PostsPage;
