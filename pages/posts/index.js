import Head from 'next/head';
import { Fragment } from 'react';
import AllPosts from '../../components/posts/all-posts';
import { getAllPosts } from '../../lib/posts-util';

const AllPostsPage = ({ posts }) => {
  return (
    <Fragment>
      <Head>
        <title>All Posts</title>
        <meta
          name={'description'}
          content={'A list of all programming-related tutorials and posts!'}
        />
      </Head>
      <AllPosts posts={posts} />
    </Fragment>
  );
};

export default AllPostsPage;

export const getStaticProps = async () => {
  const allPosts = getAllPosts();

  return {
    props: {
      posts: allPosts
    },
    revalidate: 60
  };
};
