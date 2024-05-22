import { GetStaticProps, GetStaticPaths } from 'next';
import { Comment, Post } from '../../lib/types';
import { getPost, getPosts, getComments } from '../../lib/data';

interface PostPageProps {
  post: Post;
  comments: Comment[];
}

const PostPage: React.FC<PostPageProps> = ({ post, comments }) => {
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
  const comments = await getComments(postId);
  return {
    props: {
      post,
      comments,
    },
  };
};

export default PostPage;
