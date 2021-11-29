import { useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import TeamUpItem from '../../components/Openings/TeamUpItem';
import Modal from '@/components/UI/Modal/Modal';
import CreatePostForm from '@/components/Openings/CreatePostForm';
import { useAuth } from '@/context/authContext';
import { JoinPostType } from '@/utilities/join/JoinPostType';
import { firebaseAdmin } from 'firebase/firebaseAdmin';
import Aux from 'hoc/Auxiliary/Auxiliary';
import TeamUpFAQ from '@/components/Openings/TeamUpFAQ';

const JoinPage = ({ joinPosts }: { joinPosts: JoinPostType[] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    userData: { uid },
  } = useAuth();
  const router = useRouter();
  const goToMyPosts = () => {
    router.push(`/join/${uid}`);
  };

  return (
    <div className="flex flex-col sm:static w-full sm:px-10 px-0">
      <Head>
        <title>Openings</title>
        <meta name="description" content="Join teams and Clans!" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <Aux>
        <div className={'flex mt-3 md:w-2/3 xl:w-1/2 sm:mx-auto mx-2'}>
          <TeamUpFAQ />
        </div>
        <div
          className={
            'flex justify-between rounded-lg bg-gray-900 h-14 ' +
            'md:w-2/3 xl:w-1/2 sm:mx-auto mx-3 mt-4 mb-3 px-8 py-2 relative'
          }
        >
          <span
            className={
              'text-lg font-semibold tracking-wide text-gray-300 absolute ' +
              'cursor-pointer hover:text-indigo-600 bg-gray-800/50 hover:bg-indigo-200 ' +
              'px-3 py-1.5 top-2 left-2.5 rounded-md active:bg-indigo-300'
            }
            onClick={goToMyPosts}
          >
            My Listings
          </span>
          <span
            className={
              'text-lg font-semibold tracking-wide text-gray-300 absolute rounded-md ' +
              'right-2.5 flex justify-center items-center px-2 py-1.5 top-2 ' +
              'cursor-pointer bg-indigo-600 hover:bg-indigo-700 active:opacity-70'
            }
            onClick={() => setIsModalOpen(true)}
          >
            Find Teammate
          </span>
        </div>
        <div>
          {joinPosts.map((joinPost) => (
            <TeamUpItem data={joinPost} key={joinPost.id} />
          ))}
        </div>
        <Modal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)}>
          <CreatePostForm closeModal={() => setIsModalOpen(false)} />
        </Modal>
      </Aux>
    </div>
  );
};

export default JoinPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const joinPosts: JoinPostType[] = [];
  try {
    await firebaseAdmin
      .firestore()
      .collection('teamOpening')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          joinPosts.push({ ...(doc.data() as JoinPostType), id: doc.id });
        });
      });
    return { props: { joinPosts } };
  } catch (err) {
    context.res.writeHead(302, { Location: '/auth' });
    context.res.end();
    console.log('Error getting server side props:', err);
    return { props: null };
  }
}
