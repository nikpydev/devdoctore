import Head from 'next/head';
import { Fragment } from 'react';
import PostContent from '../../components/posts/post-detail/post-content';
import { getPostData, getPostsFiles } from '../../lib/posts-util';

const PostDetailPage = ({ post }) => {
  return (
    <Fragment>
      <Head>
        <title>{post.title}</title>
        <meta name={'description'} content={post.excerpt} />
      </Head>
      <PostContent post={post} />
    </Fragment>
  );
};

export default PostDetailPage;

export const getStaticProps = async (context) => {
  const { slug } = context.params;
  const post = getPostData(slug);

  return {
    props: {
      post
    },
    revalidate: 600
  };
};

export const getStaticPaths = async () => {
  const allPostFileNames = getPostsFiles();
  const pathsArr = allPostFileNames.map((postFileName) => ({
    params: {
      slug: postFileName.replace(/\.md$/, '')
    }
  }));

  return {
    paths: pathsArr,
    fallback: 'blocking'
  };
};
