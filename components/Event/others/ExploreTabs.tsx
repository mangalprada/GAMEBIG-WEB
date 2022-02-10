import { useRouter } from 'next/router';
import Link from 'next/link';
import FriendsIcon from '../../UI/Icons/NavIcons/FriendsIcon';
import OrgsIcon from '../../UI/Icons/NavIcons/PageIcon';

const EventTabs = () => {
  const router = useRouter();

  return (
    <div
      className="md:w-2/3 xl:w-1/2 my-2 mx-2 md:mx-auto bg-gray-900/90 rounded-md gap-0.5
    text-gray-300 font-bold font-sans text-sm sm:text-lg flex items-center justify-evenly"
    >
      <Link href={'/explore'} passHref>
        <span
          className={
            'cursor-pointer py-1 px-6 sm:px-12 md:px-20 rounded w-1/2 flex justify-center items-center gap-1 md:gap-4 ' +
            (router.pathname === '/explore'
              ? ' bg-cyan-900'
              : 'hover:bg-cyan-900/40')
          }
        >
          Organizations
          <OrgsIcon isActive={router.pathname === '/explore'} size={22} />
        </span>
      </Link>
      <Link href={'/explore/gamers'} passHref>
        <span
          className={
            'cursor-pointer py-1 px-10 sm:px-12 md:px-20 rounded w-1/2 flex justify-center items-center gap-1 md:gap-4 ' +
            (router.pathname === '/explore/gamers'
              ? ' bg-cyan-900'
              : 'hover:bg-cyan-900/40')
          }
        >
          Gamers
          <FriendsIcon
            isActive={router.pathname === '/explore/gamers'}
            size={25}
          />
        </span>
      </Link>
    </div>
  );
};

export default EventTabs;
