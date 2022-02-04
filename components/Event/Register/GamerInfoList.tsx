import { BasicUserType, GamerType } from '@/utilities/types';
import Image from 'next/image';
import DeleteIcon from '@/components/UI/Icons/Others/DeleteIcon';

interface Props {
  gamers: GamerType[];
  removeItem?: (username: string) => void;
}

const GamersInfoList = ({ gamers, removeItem }: Props) => {
  if (gamers.length === 0) return null;

  return (
    <div className="w-full flex flex-col">
      {gamers.map((gamer, index) => (
        <div
          key={index}
          className="w-full flex items-center justify-between my-1 md:pr-4 rounded-md bg-gray-800"
        >
          <div
            className={'m-2 py-1.5 px-2 md:py-1 md:px-4 rounded-md bg-gray-800'}
          >
            <section className="flex gap-3 items-center justify-start ">
              {gamer.photoURL ? (
                <div className="relative h-8 w-8 md:h-12 md:w-12 cursor-pointer">
                  <Image
                    src={gamer.photoURL}
                    alt="Picture of a friend"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                  />
                </div>
              ) : null}
              <section className="flex flex-col cursor-pointer">
                <span className="font-semibold text-sm  md:text-lg text-gray-300 hover:text-indigo-600">
                  {gamer.name}
                </span>
                <span className="font-semibold text-gray-500 text-xs md:text-base">
                  @{gamer.username}
                </span>
              </section>
            </section>
          </div>
          <section className="flex flex-col">
            <span className="text-xs text-gray-500">In Game ID</span>
            <span className={'pb-2 px-4 text-sm'}>{gamer.inGameId}</span>
          </section>
          <section className="flex flex-col">
            <span className="text-xs text-gray-500">In Game Name</span>
            <span className={'pb-2 px-4 text-sm '}>{gamer.inGameName}</span>
          </section>
          {removeItem ? (
            <DeleteIcon size={22} onClick={() => removeItem(gamer.username)} />
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default GamersInfoList;
