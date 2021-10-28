import Image from 'next/image';
import { useAuth } from '../../context/authContext';
import { games } from '../../utilities/GameList';

const GameBadge = () => {
  return (
    <div className="flex m-1 py-1 px-1.5 border-2 border-green-500 bg-gray-800 rounded-md gap-2">
      <div className="relative h-5 w-5 ">
        <Image
          src={games['bgmi-m'].imageSource}
          alt="Picture of a friend"
          layout="fill"
          objectFit="contain"
          className="rounded-full"
        />
      </div>
      <span className="text-sm text-indigo-600">
        {games['bgmi-m'].shortName}
      </span>
    </div>
  );
};

const ProfileCard = () => {
  const { userData } = useAuth();
  return (
    <div className="mt-8">
      {userData.photoURL ? (
        <div
          className="flex flex-col items-center font-sans font-semibold text-gray-300 h-auto w-min p-2 md:p-4
        gap-2 rounded-lg bg-gray-900 transform hover:-translate-y-4 transition duration-500 ease-in-out cursor-pointer"
        >
          <div className="h-52 w-52 relative">
            <Image
              src={userData.photoURL}
              alt="Picture of a friend"
              layout="fill"
              objectFit="contain"
              className="rounded-lg"
            />
          </div>
          <span className="text-indigo-600 text-xl">@malay1</span>
          <span className="text-gray-300 font-sans">
            Founder GameBig, Coder and Casual Gamer
          </span>
          <div className="flex flex-wrap justify-center">
            <GameBadge />
            <GameBadge />
            <GameBadge />
            <GameBadge />
          </div>
          <div className="flex w-full justify-center bg-indigo-600 font-sans text-xl py-1 px-4 rounded-md">
            <span>Add Friend</span>
          </div>
        </div>
      ) : (
        <h2>friends</h2>
      )}
    </div>
  );
};

export default ProfileCard;
