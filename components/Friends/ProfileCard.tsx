import Image from 'next/image';
import { useAuth } from '../../context/authContext';
import { games } from '../../utilities/GameList';

const GameBadge = () => {
  return (
    <div className="w-12 h-6">
      <div className="h-10 w-10 relative rounded-full">
        <Image
          src={games['bgmi-m'].imageSource}
          alt="Picture of a friend"
          layout="fill"
          objectFit="contain"
        />
      </div>
      <span>{games['bgmi-m'].shortName}</span>
    </div>
  );
};

const ProfileCard = () => {
  const { userData } = useAuth();
  return (
    <div className="mt-8">
      {userData.photoURL ? (
        <div
          className="flex flex-col bg-gray-900 font-sans font-semibold text-gray-300 h-1/3 w-1/4
        items-center gap-2 rounded-lg bg-gradient-to-t from-gray-900 via-transparent to-indigo-600 "
        >
          <div className="h-48 w-full relative rounded-lg">
            <Image
              src={userData.photoURL}
              alt="Picture of a friend"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <span className="text-indigo-600 text-xl">@malay1</span>
          <span>Founder GameBig, Coder and Casual Gamer</span>
          <div className="flex">
            <GameBadge />
            <GameBadge />
            <GameBadge />
            <GameBadge />
          </div>
        </div>
      ) : (
        <h2>friends</h2>
      )}{' '}
    </div>
  );
};

export default ProfileCard;
