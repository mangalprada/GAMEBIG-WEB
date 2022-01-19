import { useState, useEffect } from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import { useAuth } from '../../../context/authContext';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import GameItem from '../../../components/Profile/GameItem';
import ProfileHeader from '../../../components/Profile/ProfileHeader';
import FixedButton from '../../../components/UI/Buttons/FixedButton';
import { getGamerData } from '../../../libs/gamerData';
import Modal from '@/components/UI/Modal/Modal';
import SelectGame from '@/components/Game/SelectGame';
import GameDetails from '@/components/Game/GameDetails';
import axios from 'axios';
import useSWR from 'swr';
import LurkingCat from '@/components/UI/Loaders/LurkingCat';
import { useRouter } from 'next/router';
const { BASE_URL } = process.env;

const fetcher = async (url: string) => {
  const res = await axios.get(url);
  return res.data.data;
};

const Games: NextPage = () => {
  const { userData: user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [gameCode, setGameCode] = useState('');
  const [savedGames, setSavedgames] = useState<any>();
  const router = useRouter();
  const { data: userData } = useSWR(
    `${BASE_URL}/api/user/?username=${router.query.username}`,
    fetcher
  );

  useEffect(() => {
    async function getSavedGames() {
      const games = await getGamerData(userData.uid);
      setSavedgames(games);
    }
    if (userData) getSavedGames();
  }, [userData]);

  const handleClose = () => {
    setIsModalOpen(false);
    setPageNumber(1);
    setGameCode('');
  };

  if (!userData) return <LurkingCat height={300} width={300} />;

  const noGamesComponent = (
    <div
      className={
        'md:w-3/4 lg:w-2/3 xl:w-1/2 rounded-lg my-3 mt-4 md:mx-auto mx-4 ' +
        'flex flex-col justify-center items-center'
      }
    >
      <span className="text-lg text-gray-500 font-medium text-center">
        {userData.username === user.username
          ? 'Start adding game details to showcase your skills! 😎'
          : 'No games Found for this user 🙄'}
      </span>
    </div>
  );

  const Games = savedGames
    ? Object.keys(savedGames).map((key) => {
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
      })
    : null;

  return (
    <div>
      <Head>
        <title>Profile</title>
        <meta
          name="description"
          content={`${userData.name}'s Profile`}
          key="desc"
        />

        {/* OG meta */}
        <meta property="og:title" content="Profile" />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="Check out my profile at GameBig"
        />
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
          <div>{Games}</div>
        </div>
        <Modal isOpen={isModalOpen} closeModal={handleClose}>
          <div>
            {savedGames ? (
              <div>
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
              </div>
            ) : null}
          </div>
        </Modal>
      </Aux>
    </div>
  );
};

export default Games;
