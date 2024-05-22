import { GetStaticProps } from 'next';
import { Post } from '../lib/types';
import { getPosts } from '../lib/data';
import Link from 'next/link';

interface HomeProps {
  randomPosts: Post[];
}

const Home: React.FC<HomeProps> = ({ randomPosts }) => {
  return (
    <div>
      <h1>Homepage</h1>
      <h2>Random Posts</h2>
      <ul>
        {randomPosts?.map((post) => (
          <li key={post?.id}>
            <Link href={`/post/${post?.id}`}>{post?.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const posts = await getPosts();
  const randomPosts = posts.sort(() => Math.random() - 0.5).slice(0, 5); // Randomly select 5 posts
  return {
    props: {
      randomPosts,
    },
    revalidate: 10,
  };
};

export default Home;
