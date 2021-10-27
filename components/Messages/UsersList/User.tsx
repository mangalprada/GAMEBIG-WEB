import Image from 'next/image';
import { games } from '../../../utilities/GameList';

const User = () => {
  return (
    <div
      className="flex items-center justify-items-stretch text-gray-300 font-sans font-semibold 
    bg-gray-900 w-full gap-3 px-3 py-3.5  m-1 rounded-md"
    >
      <div className="relative h-12 w-12 ">
        <Image
          src={games['bgmi-m'].imageSource}
          alt="Picture of a friend"
          layout="fill"
          objectFit="contain"
          className="rounded-full"
        />
      </div>
      <div className="flex flex-col w-full pr-2">
        <div className="flex justify-between">
          <span className="text-lg">Mark Zuckerberg</span>
          <span className="text-sm text-gray-500">11:00 PM</span>
        </div>
        <h1 className="text-base text-gray-500">
          Hey Mark! Loan me a billion dollars!
        </h1>
      </div>
    </div>
  );
};

export default User;
