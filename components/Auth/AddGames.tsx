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
    <div className="bg-transparent z-10">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {Object.keys(games).map(function (key, index) {
          return (
            <GameForm
              isUpdating={isUpdating}
              username={username}
              game={games[key]}
              addToCurrentGames={addToCurrentGames}
              key={index}
            />
          );
        })}
      </div>
      <div className="flex justify-evenly">
        <FixedButton
          name="Previous"
          type="submit"
          onClickHandler={() => updateAuthPageNumber(2)}
        />
        <FixedButton
          name={currentGames.length === 0 ? 'Skip' : 'Finish'}
          type="submit"
          onClickHandler={handleFinish}
        />
      </div>
    </div>
  );
}

export default AddGames;
