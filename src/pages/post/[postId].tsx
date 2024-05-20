import { GetStaticProps, GetStaticPaths } from 'next';
import { Post } from '../../lib/types';
import { getPost, getPosts } from '../../lib/data';

interface PostPageProps {
  post: Post;
}

const PostPage: React.FC<PostPageProps> = ({ post }) => {
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  // When this is true (in preview environments) don't
  // prerender any static pages
  // (faster builds, but slower initial page load)
  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return {
      paths: [],
      fallback: 'blocking',
    };
  }

  const posts = await getPosts();
  const paths = posts.map((post) => ({
    params: { postId: String(post.id) },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<PostPageProps> = async ({
  params,
}) => {
  if (!params || !params.postId) {
    return {
      notFound: true,
    };
  }
  const postId = parseInt(params.postId as string);
  const post = await getPost(postId);
  return {
    props: {
      post,
    },
  };
};

export async function getStaticPaths() {
  // When this is true (in preview environments) don't
  // prerender any static pages
  // (faster builds, but slower initial page load)
  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return {
      paths: [],
      fallback: 'blocking',
    };
  }

  // Call an external API endpoint to get posts
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await res.json();

  // Get the paths we want to prerender based on posts
  // In production environments, prerender all pages
  // (slower builds, but faster initial page load)
  const paths = posts.map((post) => ({
    params: { id: post.id },
  }));

  // { fallback: false } means other routes should 404
  return { paths, fallback: false };
}

export default PostPage;
