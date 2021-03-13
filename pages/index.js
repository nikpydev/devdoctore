import { Fragment } from "react";
import FeaturedPosts from "../components/home-page/featured-posts";
import Hero from "../components/home-page/hero";
import Head from "next/head";
import { getFeaturedPosts } from "../lib/posts-util";

const HomePage = ({ posts }) => {
  return (
    <Fragment>
      <Head>
        <title>Nikhil's Blog</title>
        <meta
          name={"description"}
          content={"I post about programming and web development"}
        />
      </Head>
      <Hero />
      <FeaturedPosts posts={posts} />
    </Fragment>
  );
};

export default HomePage;

export const getStaticProps = async () => {
  const featuredPosts = getFeaturedPosts();

  return {
    props: {
      posts: featuredPosts,
    },
    revalidate: 60,
  };
};
