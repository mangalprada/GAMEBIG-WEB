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
    <div className="md:hidden w-full h-12 font-sans">
      <section
        id="bottom-navigation"
        className={
          'block rounded-t-xl fixed inset-x-0 bottom-0 z-10 shadow ' +
          'bg-gradient-to-t from-black via-black to-gray-800'
        }
      >
        <div className="flex w-full justify-evenly space-x-1">
          {/** Events */}
          <Link href="/" passHref>
            <a className="text-gray-600 focus:text-indigo-500 hover:text-indigo-500 py-0.5 px-1.5">
              <span className="flex justify-center items-center pt-0.5">
                <TrophyIcon isActive={router.pathname === '/'} size={30} />
              </span>
              <span
                className={
                  'text-xs -mt-0.5 flex flex-1 justify-center ' +
                  (router.pathname === '/'
                    ? 'text-indigo-600 font-medium'
                    : 'text-gray-600')
                }
              >
                Events
              </span>
            </a>
          </Link>

          {/** Page */}
          <Link
            href={linkedPageId ? `/page/${linkedPageId}/events` : `/page`}
            passHref
          >
            <a className="text-gray-600 focus:text-indigo-500 hover:text-indigo-500 py-0.5 px-1.5">
              <span className="flex justify-center items-center pt-0.5">
                <PageIcon
                  isActive={
                    router.pathname === '/page/[pageId]/events' ||
                    router.pathname === '/page/[pageId]' ||
                    router.pathname === '/page' ||
                    router.pathname === '/page/create'
                  }
                  size={30}
                />
              </span>
              <span
                className={
                  'text-xs text-gray-400 -mt-0.5 flex flex-1 justify-center ' +
                  (router.pathname === '/page/[pageId]/events' ||
                  router.pathname === '/page/[pageId]' ||
                  router.pathname === '/page' ||
                  router.pathname === '/page/create'
                    ? 'text-indigo-600 font-medium'
                    : 'text-gray-600')
                }
              >
                Page
              </span>
            </a>
          </Link>

          {/** People */}
          <Link href="/people" passHref>
            <a className="text-gray-600 focus:text-indigo-500 hover:text-indigo-500 py-0.5 px-1.5">
              <span className="flex justify-center items-center pt-0.5">
                <FriendsIcon
                  isActive={router.pathname === '/people'}
                  size={35}
                />
              </span>
              <span
                className={
                  'text-xs text-gray-400 -mt-1 flex flex-1 justify-center ' +
                  (router.pathname === '/people'
                    ? 'text-indigo-600 font-medium'
                    : 'text-gray-600')
                }
              >
                People
              </span>
            </a>
          </Link>

          {/** Teamup */}
          <Link href="/join" passHref>
            <a className="text-gray-600 focus:text-indigo-500 hover:text-indigo-500 py-0.5 px-1.5">
              <span className="flex justify-center items-center">
                <JoinIcon isActive={router.pathname === '/join'} size={32} />
              </span>
              <span
                className={
                  'text-xs text-gray-400 -mt-0.5 -ml-1.5 flex flex-1 justify-center ' +
                  (router.pathname === '/join'
                    ? 'text-indigo-600 font-medium'
                    : 'text-gray-600')
                }
              >
                Join
              </span>
            </a>
          </Link>

          {/**Message */}
          <Link href="/messages" passHref>
            <a className="text-gray-600 focus:text-indigo-500 hover:text-indigo-500 py-0.5 px-1.5">
              <span className="flex justify-center items-center pt-0.5">
                <MessageIcon
                  isActive={router.pathname === '/messages'}
                  size={30}
                />
              </span>
              <span
                className={
                  'text-xs text-gray-400 -mt-0.5 flex flex-1 justify-center ' +
                  (router.pathname === '/messages'
                    ? 'text-indigo-600 font-medium'
                    : 'text-gray-600')
                }
              >
                Message
              </span>
            </a>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default BottomNavigationBar;
