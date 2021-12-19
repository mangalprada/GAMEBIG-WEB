import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/authContext';
import { games } from '../../utilities/GameList';
import { GamerData } from '../../utilities/types';
import GameForm from './GameForm';
import FixedButton from '../UI/Buttons/FixedButton';

function AddGames({ uid }: { uid: string }) {
  const { updateAuthPageNumber } = useAuth();
  const [currentGames, setCurrentGames] = useState<Array<GamerData>>([]);
  const router = useRouter();

  const addToCurrentGames = (game: GamerData) => {
    setCurrentGames([...currentGames, game]);
  };

  const handleFinish = () => {
    router.push('/openings');
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
        <div className="w-full flex justify-center my-8">
          <span className="text-lg md:text-2xl text-center text-gray-300 font-sans">
            Add games details to quickly register for events!!
          </span>
        </div>
        <div className="flex flex-col flex-wrap ">
          {Object.keys(games).map(function (key, index) {
            return (
              <GameForm
                uid={uid}
                game={games[key]}
                addToCurrentGames={addToCurrentGames}
                key={index}
              />
            );
          })}
        </div>
      </div>
      <div className="flex justify-evenly w-full mb-16 md:mb-0 xl:px-52">
        <FixedButton name="Back" onClick={() => updateAuthPageNumber(2)} />
        <FixedButton
          name={currentGames.length === 0 ? 'Skip' : 'Finish'}
          onClick={handleFinish}
        />
      </div>
    </>
  );
}

export default AddGames;
