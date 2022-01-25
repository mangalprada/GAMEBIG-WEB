import { useState } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import Head from 'next/head';
import TeamUpItem from '../../components/Openings/TeamUpItem';
import Modal from '@/components/UI/Modal/Modal';
import CreateTeamUpPostForm from '@/components/Openings/CreateTeamUpPostForm';
import { useAuth } from '@/context/authContext';
import { TeamUpPost } from '@/utilities/openings/TeamUpPost';
import Aux from 'hoc/Auxiliary/Auxiliary';
import TeamUpFAQ from '@/components/Openings/TeamUpFAQ';
import SelectGame from '@/components/Game/SelectGame';
import LurkingCat from '@/components/UI/Loaders/LurkingCat';
import axios from 'axios';
const { BASE_URL } = process.env;

async function getOpenings(arg: string) {
  const response = await axios.get(arg);
  return response.data.joinPosts;
}

const JoinPage = () => {
  const {
    userData: { uid },
  } = useAuth();
  const router = useRouter();
  const { data: joinPosts } = useSWR(
    `${BASE_URL}/api/teamOpenings`,
    getOpenings
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [gameCode, setGameCode] = useState('');

  function goToMyPosts() {
    router.push(`/openings/${uid}`);
  }

  function handleClose() {
    setIsModalOpen(false);
    setGameCode('');
    setPageNumber(1);
  }

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
            'flex justify-between rounded-lg bg-slate-900 h-12 sm:h-14 ' +
            'md:w-2/3 xl:w-1/2 sm:mx-auto mx-3 mt-2 mb-2 px-8 py-2 relative'
          }
        >
          <span
            className={
              'text-sm sm:text-lg font-semibold tracking-wide text-gray-300 absolute ' +
              'cursor-pointer hover:text-indigo-600 bg-gray-800/50 hover:bg-indigo-200 ' +
              'px-3 py-1.5 top-2 left-2.5 rounded-md active:bg-indigo-300'
            }
            onClick={goToMyPosts}
          >
            My Invites
          </span>
          <span
            className={
              'text-sm sm:text-lg font-semibold tracking-wide text-gray-300 absolute rounded-md ' +
              'right-2.5 flex justify-center items-center px-2 py-1.5 top-2 ' +
              'cursor-pointer bg-indigo-600 hover:bg-indigo-700 active:opacity-70'
            }
            onClick={() => setIsModalOpen(true)}
          >
            Invite Teammates
          </span>
        </div>
        <div>
          {joinPosts ? (
            joinPosts.map((joinPost: TeamUpPost) => (
              <TeamUpItem data={joinPost} key={joinPost.docId} />
            ))
          ) : (
            <LurkingCat height={300} width={300} />
          )}
        </div>
        <Modal isOpen={isModalOpen} closeModal={handleClose}>
          <>
            {
              {
                1: (
                  <SelectGame
                    updatePage={(pageNumber) => setPageNumber(pageNumber)}
                    gameCode={gameCode}
                    setGame={setGameCode}
                  />
                ),
                2: (
                  <CreateTeamUpPostForm
                    gameCode={gameCode}
                    closeModal={handleClose}
                  />
                ),
              }[pageNumber]
            }
          </>
        </Modal>
      </Aux>
    </div>
  );
};

export default JoinPage;
