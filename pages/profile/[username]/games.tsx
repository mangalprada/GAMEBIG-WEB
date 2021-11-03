import { useState } from 'react';
import Head from 'next/head';
import nookies from 'nookies';
import { GetServerSidePropsContext } from 'next';
import { useAuth } from '../../../context/authContext';
import { firebaseAdmin } from '../../../firebase/firebaseAdmin';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import { UserData, GamerData } from '../../../utilities/types';
import GameItem from '../../../components/Profile/GameItem';
import GameForm from '../../../components/Auth/GameForm';
import { games as allSupportedGames } from '../../../utilities/GameList';
import ProfileHeader from '../../../components/Profile/ProfileHeader';
import getUser from '../../../libs/getUser';
import getGamerData from '../../../libs/getGamerData';
import FixedButton from '../../../components/UI/Buttons/FixedButton';
import Modal from '@/components/UI/Modal/Modal';

export default function Home({
  userData,
  savedGames,
}: {
  userData: UserData;
  savedGames: Array<GamerData>;
}) {
  const { userData: user, signout } = useAuth();
  const [open, setOpen] = useState(false);
  const [currentGames, setCurrentGames] = useState(savedGames);

  const handleClose = () => {
    setOpen(false);
  };
  const removeGame = (docId: string) => {
    const temp = currentGames.filter((gameItem) => {
      return docId !== gameItem.docId;
    });
    setCurrentGames(temp);
  };
  // todo: update n adding
  const addToCurrentGames = (game: GamerData) => {
    setCurrentGames([...currentGames, game]);
  };

  const getOldValues = (key: string) => {
    return currentGames.find((element) => element.gameCode === key);
  };

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
              <FixedButton name="Update Games" onClick={() => setOpen(true)} />
            ) : null}
          </div>
          <div>
            {currentGames.map((game, index) => {
              return (
                <GameItem
                  game={game}
                  key={index}
                  username={userData.username}
                  removeGame={removeGame}
                  setBackdrop={setOpen}
                />
              );
            })}
          </div>
        </div>
        <Modal isOpen={open} closeModal={handleClose}>
          <div>
            {Object.keys(allSupportedGames).map(function (key, index) {
              return (
                <GameForm
                  username={userData.username}
                  game={allSupportedGames[key]}
                  key={key}
                  oldValues={getOldValues(key)}
                  addToCurrentGames={addToCurrentGames}
                />
              );
            })}
          </div>
        </Modal>
      </Aux>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  let savedGames: GamerData[] = [];
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
