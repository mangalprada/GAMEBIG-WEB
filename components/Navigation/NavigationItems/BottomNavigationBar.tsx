import { useRouter } from 'next/router';
import Link from 'next/link';
import PageIcon from '../../UI/Icons/NavIcons/PageIcon';
import MessageIcon from '../../UI/Icons/NavIcons/MessageIcon';
import FriendsIcon from '../../UI/Icons/NavIcons/FriendsIcon';
import JoinIcon from '../../UI/Icons/NavIcons/JoinIcon';
import TrophyIcon from '../../UI/Icons/NavIcons/TrophyIcon';
import { useAuth } from '../../../context/authContext';

function BottomNavigationBar() {
  const {
    userData: { linkedPageId },
  } = useAuth();
  const router = useRouter();
  return (
    <div className="md:hidden w-full font-sans">
      <section
        id="bottom-navigation"
        className={
          'block rounded-t-xl fixed inset-x-0 bottom-0 z-10 shadow ' +
          'bg-gradient-to-t from-black via-black to-gray-800'
        }
      >
        <div className="flex w-full justify-evenly">
          <Link href="/" passHref>
            <a className="py-1 px-4 sm:px-8 text-gray-600 focus:text-indigo-500 hover:text-indigo-500">
              <TrophyIcon isActive={router.pathname === '/'} size={36} />
            </a>
          </Link>
          <Link
            href={linkedPageId ? `/page/${linkedPageId}/events` : `/page`}
            passHref
          >
            <a className="py-1 px-4 sm:px-8 text-gray-600 focus:text-indigo-500 hover:text-indigo-500">
              <PageIcon
                isActive={
                  router.pathname === '/page/[pageId]/events' ||
                  router.pathname === '/page/[pageId]' ||
                  router.pathname === '/page' ||
                  router.pathname === '/page/create'
                }
                size={33}
              />
            </a>
          </Link>
          <Link href="/people" passHref>
            <a className="py-1 px-4 sm:px-8 text-gray-600 focus:text-indigo-500 hover:text-indigo-500">
              <FriendsIcon isActive={router.pathname === '/people'} size={36} />
            </a>
          </Link>
          <Link href="/join" passHref>
            <a className="py-1 px-4 sm:px-8 text-gray-600 focus:text-indigo-500 hover:text-indigo-500">
              <JoinIcon isActive={router.pathname === '/join'} size={34} />
            </a>
          </Link>
          <Link href="/messages" passHref>
            <a className="py-1 px-4 sm:px-8 text-gray-600 focus:text-indigo-500 hover:text-indigo-500">
              <MessageIcon
                isActive={router.pathname === '/messages'}
                size={33}
              />
            </a>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default BottomNavigationBar;
