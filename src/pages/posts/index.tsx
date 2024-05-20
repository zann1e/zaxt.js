import { GetStaticProps } from 'next';
import { Post } from '../../lib/types';
import { getPosts } from '../../lib/data';

interface PostsProps {
  posts: Post[];
}

const PostsPage: React.FC<PostsProps> = ({ posts }) => {
  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
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
