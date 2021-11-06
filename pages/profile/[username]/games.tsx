import { useState } from 'react';
import Head from 'next/head';
import nookies from 'nookies';
import { GetServerSidePropsContext, NextPage } from 'next';
import { useAuth } from '../../../context/authContext';
import { firebaseAdmin } from '../../../firebase/firebaseAdmin';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import { UserData, GamerData } from '../../../utilities/types';
import GameItem from '../../../components/Profile/GameItem';
import ProfileHeader from '../../../components/Profile/ProfileHeader';
import getUser from '../../../libs/getUser';
import { getGamerData } from '../../../libs/gamerData';
import FixedButton from '../../../components/UI/Buttons/FixedButton';
import Modal from '@/components/UI/Modal/Modal';
import SelectGame from '@/components/Game/SelectGame';
import GameDetails from '@/components/Game/GameDetails';

type PageProps = {
  userData: UserData;
  savedGames: Record<string, GamerData>;
};

const Games: NextPage<PageProps> = ({ userData, savedGames }) => {
  const { userData: user } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  const [gameCode, setGameCode] = useState('');

  const handleClose = () => {
    setIsModalOpen(false);
    setPageNumber(1);
    setGameCode('');
  };

  console.log(savedGames);

  const usersGames = Object.keys(savedGames).map((key) => {
    return [...Array(savedGames[key].gameCode)].map((_, index) => {
      return (
        <GameItem
          game={savedGames[key]}
          key={index}
          username={userData.username}
          setIsModalOpen={setIsModalOpen}
          setGameCode={setGameCode}
          setPageNumber={setPageNumber}
        />
      );
    });
  });

  return (
    <div>
      <Head>
        <title>Profile</title>
        <meta name="description" content="Players Profile" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <Aux>
        <ProfileHeader userData={userData} />
        <div className="w-11/12 md:w-5/6 lg:w-1/2 mx-auto">
          <div className="flex justify-end mt-2 mr-1">
            {userData.username === user.username ? (
              <FixedButton
                name="Add Games"
                onClick={() => setIsModalOpen(true)}
              />
            ) : null}
          </div>
          <div>{usersGames}</div>
        </div>
        <Modal isOpen={isModalOpen} closeModal={handleClose}>
          <>
            {
              {
                1: (
                  <SelectGame
                    updatePage={(pageNumber) => setPageNumber(pageNumber)}
                    setGame={setGameCode}
                    gameCode={gameCode}
                  />
                ),
                2: (
                  <GameDetails
                    updatePage={(pageNumber) => setPageNumber(pageNumber)}
                    gameCode={gameCode}
                    setGame={setGameCode}
                    gameData={savedGames[gameCode]}
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

export default Games;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  let savedGames: Record<string, GamerData> = {};
  let userData: UserData = {} as UserData;
  try {
    const cookies = nookies.get(context);
    await firebaseAdmin
      .auth()
      .verifyIdToken(cookies.token)
      .then(async () => {
        const { username } = context.query;
        if (typeof username == 'string') {
          userData = await getUser(username);
          savedGames = await getGamerData(username);
        }
      });
    return {
      props: { userData, savedGames },
    };
  } catch (err) {
    context.res.writeHead(302, { Location: '/auth' });
    context.res.end();
    console.log('Error getting server side props:', err);
    return { props: {} as never };
  }
}
