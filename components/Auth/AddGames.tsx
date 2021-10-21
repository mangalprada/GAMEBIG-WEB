import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/authContext';
import { games } from '../../utilities/GameList';
import { GamerData } from '../../utilities/types';
import GameForm from './GameForm';
import FixedButton from '../UI/Buttons/FixedButton';

function AddGames({
  username,
  isUpdating,
}: {
  username: string;
  isUpdating: boolean;
}) {
  const { updateAuthPageNumber } = useAuth();
  const [currentGames, setCurrentGames] = useState<Array<GamerData>>([]);
  const router = useRouter();

  const addToCurrentGames = (game: GamerData) => {
    setCurrentGames([...currentGames, game]);
  };

  const handleFinish = () => {
    router.push('/');
    updateAuthPageNumber(1);
  };

  return (
    <>
      <div
        className={
          'h-3/4 overflow-y-scroll bg-gradient-to-br md:w-4/6 ' +
          'from-gray-900 via-transparent to-gray-900 rounded-md mx-5'
        }
      >
        <div className="flex flex-col flex-wrap ">
          {Object.keys(games).map(function (key, index) {
            return (
              <GameForm
                username={username}
                game={games[key]}
                addToCurrentGames={addToCurrentGames}
                key={index}
              />
            );
          })}
        </div>
      </div>
      <div className="flex justify-evenly w-full xl:px-52">
        <FixedButton
          name="Back"
          onClickHandler={() => updateAuthPageNumber(2)}
        />
        <FixedButton
          name={currentGames.length === 0 ? 'Skip' : 'Finish'}
          onClickHandler={handleFinish}
        />
      </div>
    </>
  );
}

export default AddGames;
