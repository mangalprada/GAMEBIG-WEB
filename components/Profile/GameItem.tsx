import Image from 'next/image';
import { db } from '../../firebase/firebaseClient';
import { games } from '../../utilities/GameList';
import { GamerData } from '../../utilities/types';
import { useAuth } from '../../context/authContext';
import FixedButton from '../UI/Buttons/FixedButton';
import { useUI } from '@/context/uiContext';

type Props = {
  game: GamerData;
  setBackdrop: (open: boolean) => void;
  removeGame: (docId: string) => void;
  username: string;
};

export default function GameItem({
  game,
  setBackdrop,
  removeGame,
  username,
}: Props) {
  const { userData } = useAuth();
  const { openSnackBar } = useUI();

  const { gameCode, ingameid, ingamename, docId } = game;

  const deleteGame = async () => {
    try {
      await db.collection('gamers').doc(docId).delete();
      if (gameCode) {
        openSnackBar({
          label: 'Deleted',
          message: `${games[gameCode].name} deleted!`,
          type: 'success',
        });
      }
      if (docId) removeGame(docId);
    } catch (err) {
      console.log('err', err);
    }
  };
  return (
    <div
      className={
        'grid md:grid-cols-2 grid-cols-1 w-full font-sans text-gray-300 ' +
        'bg-gray-900 rounded-lg my-2 py-10 px-4 gap-8'
      }
    >
      <div className="flex flex-col justify-evenly space-y-4">
        {gameCode && (
          <div className="md:h-32 md:w-32 h-24 w-24 relative rounded-lg mx-auto">
            <Image
              src={games[gameCode].imageSource}
              alt="Picture of Game"
              layout="fill"
              objectFit="contain"
            />
          </div>
        )}
        <div
          className={
            'mx-auto text-lg px-4 text-center font-semibold text-gray-300 tracking-wide'
          }
        >
          {gameCode ? <span>{games[gameCode].name}</span> : null}
        </div>
      </div>
      <div className="flex flex-col justify-evenly w-full">
        <div className="flex justify-evenly">
          <div>
            <label className="block uppercase text-gray-500 text-sm font-bold font-sans tracking-wide">
              In Game Name
            </label>
            <span className="font-sans font-bold text-lg">{ingamename}</span>
          </div>
          <div>
            <label className="block uppercase text-gray-500 text-sm font-bold font-sans tracking-wide">
              In Game ID
            </label>
            <span className="font-sans font-bold text-lg">{ingameid}</span>
          </div>
        </div>
        {userData.username === username ? (
          <div className="flex justify-evenly mt-5">
            <FixedButton name="EDIT" onClick={() => setBackdrop(true)} />
            <FixedButton name="DELETE" onClick={deleteGame} isDangerous />
          </div>
        ) : null}
      </div>
    </div>
  );
}
