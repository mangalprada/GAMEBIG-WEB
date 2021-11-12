import Image from 'next/image';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/authContext';
import { useUI } from '@/context/uiContext';
import { games } from '../../utilities/GameList';
import { ProfileCardData } from '../../utilities/friends/friends';
import { follow } from '../../libs/follow';

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

const Button = ({
  onClick,
  classname,
  text,
}: {
  onClick: () => void;
  classname: string;
  text: string;
}) => (
  <div
    onClick={onClick}
    className={
      'flex items-center w-full justify-center font-sans text-base md:text-xl py-1 px-4 rounded-md ' +
      classname
    }
  >
    <span>{text}</span>
  </div>
);

const ProfileCard = ({
  photoURL,
  username,
  games,
  uid,
  name,
  receiverUid,
  id,
}: ProfileCardData) => {
  const { userData } = useAuth();
  const { openSnackBar } = useUI();
  const router = useRouter();

  return (
    <div
      className="flex flex-col items-center font-sans font-semibold text-gray-300 h-auto w-min p-2 md:p-4
        gap-2 rounded-lg bg-gray-900 cursor-pointer"
    >
      <div
        onClick={() => {
          router.push(`/profile/${username}`);
        }}
        className="flex flex-col items-center"
      >
        {photoURL ? (
          <div className="h-32 w-32 md:h-52 md:w-52 relative">
            <Image
              src={photoURL}
              alt="Picture of a friend"
              layout="fill"
              objectFit="contain"
              className="rounded-lg"
            />
          </div>
        ) : null}
        <span className="text-gray-300 hover:text-indigo-600 text-xl">
          {name}
        </span>
        <span className="text-gray-500 text-base">@{username}</span>
        <div className="flex flex-wrap justify-center">
          {games.map((game: string, index: number) => (
            <GameBadge key={index} gamecode={game} />
          ))}
        </div>
      </div>
      <Button
        onClick={() => {
          follow({
            follower: {
              name: userData.name as string,
              photoURL: userData.photoURL as string,
              username: userData.username,
              uid: userData.uid,
            },
            followee: {
              photoURL: photoURL as string,
              username,
              name: name as string,
              uid: uid as string,
            },
          });
          openSnackBar({
            message: `You are Following ${username}`,
            type: 'success',
            label: '',
          });
        }}
        text="Follow"
        classname="bg-indigo-600"
      />
      <Button
        onClick={() => {
          //todo: send message
        }}
        text="Message"
        classname="bg-indigo-600"
      />
    </div>
  );
};

export default ProfileCard;
