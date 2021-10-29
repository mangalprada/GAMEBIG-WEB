import Image from 'next/image';
import { useAuth } from '../../context/authContext';
import { games } from '../../utilities/GameList';

const GameBadge = ({ gamecode, key }: { gamecode: string; key: number }) => {
  return (
    <div className="flex m-1 py-1 px-1.5 border-2 border-green-500 bg-gray-800 rounded-md gap-2">
      <div className="relative h-5 w-5 ">
        <Image
          src={games[gamecode].imageSource}
          alt="Picture of a friend"
          layout="fill"
          objectFit="contain"
          className="rounded-full"
        />
      </div>
      <span className="text-sm text-indigo-600">
        {games[gamecode].shortName}
      </span>
    </div>
  );
};

type Props = {
  image?: string;
  username: string;
  about: string;
  games: string[];
};

const ProfileCard = ({ image, username, about, games }: Props) => {
  const { userData } = useAuth();
  return (
    <div
      className="flex flex-col items-center font-sans font-semibold text-gray-300 h-auto w-min p-2 md:p-4
        gap-2 rounded-lg bg-gray-900 transform hover:-translate-y-4 transition duration-500 ease-in-out cursor-pointer"
    >
      {image ? (
        <div className="h-32 w-32 md:h-52 md:w-52 relative">
          <Image
            src={image}
            alt="Picture of a friend"
            layout="fill"
            objectFit="contain"
            className="rounded-lg"
          />
        </div>
      ) : null}
      <span className="text-indigo-600 text-xl">{username}</span>
      <span className="text-gray-300 text-center font-sans">{about}</span>
      <div className="flex flex-wrap justify-center">
        {games.map((game: string, index: number) => (
          <GameBadge key={index} gamecode={game} />
        ))}
      </div>
      <div className="flex w-full justify-center bg-indigo-600 font-sans text-base md:text-xl py-1 px-4 rounded-md">
        <span>Add Friend</span>
      </div>
    </div>
  );
};

export default ProfileCard;
