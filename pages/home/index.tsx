import { useState } from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import Aux from 'hoc/Auxiliary/Auxiliary';
import CreatePost from '@/components/Home/CreatePost';
import Post from '@/components/Home/Post';
import Modal from '@/components/UI/Modal/Modal';
import PostDetails from '@/components/Home/PostDetails';
import { PostType } from '@/utilities/post/PostType';

const Home = ({ posts }: any) => {
  const [open, setOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState({});
  const closeModal = () => {
    setOpen(false);
  };

  const openModal = () => {
    setOpen(true);
  };
  return (
    <div className="flex flex-col sm:static w-full sm:px-10 px-0">
      <Head>
        <title>GameBig</title>
        <meta name="description" content="Join teams and Clans!" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <Aux>
        <CreatePost />
        <div className="w-11/12 md:w-1/2 mx-auto flex flex-col mt-1">
          {posts &&
            posts.message.map((item: PostType, index: number) => (
              <div key={index}>
                <Post
                  post={item}
                  setSelectedPost={setSelectedPost}
                  openModal={openModal}
                  isModalOpen={open}
                />
              </div>
            ))}
        </div>
        <Modal isOpen={open} closeModal={closeModal}>
          <PostDetails
            isModalOpen={open}
            post={selectedPost}
            closeModal={closeModal}
          />
        </Modal>
      </Aux>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  let data;
  try {
    let { BASE_URL } = process.env;
    let response = await fetch(`${BASE_URL}/api/posts`, {
      method: 'GET',
    });
    data = await response.json();
  } catch (err) {
    console.log(err);
  }

  return {
    props: {
      posts: data,
    },
  };
};
