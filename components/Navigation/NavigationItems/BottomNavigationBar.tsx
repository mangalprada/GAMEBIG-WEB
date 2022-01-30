import { useRouter } from 'next/router';
import Link from 'next/link';
import PageIcon from '../../UI/Icons/NavIcons/PageIcon';
import FriendsIcon from '../../UI/Icons/NavIcons/FriendsIcon';
import JoinIcon from '../../UI/Icons/NavIcons/JoinIcon';
import TrophyIcon from '../../UI/Icons/NavIcons/TrophyIcon';
import { useAuth } from '../../../context/authContext';

function BottomNavigationBar() {
  const {
    userData: { linkedPageIds },
  } = useAuth();
  const pageId = linkedPageIds ? linkedPageIds[0] : null;
  const router = useRouter();
  return (
    <div className="md:hidden w-full h-12 font-sans">
      <section
        id="bottom-navigation"
        className={
          'block rounded-t-xl fixed inset-x-0 bottom-0 z-10 shadow ' +
          'bg-gradient-to-t from-black via-black to-slate-900'
        }
      >
        <div className="flex w-full justify-evenly space-x-1">
          {/** Events */}
          <Link href="/events" passHref>
            <a className="text-gray-600 focus:text-indigo-500 hover:text-indigo-500 py-0.5 px-1.5">
              <span className="flex justify-center items-center pt-0.5">
                <TrophyIcon
                  isActive={router.pathname === '/events'}
                  size={26}
                />
              </span>
              <span
                className={
                  'text-xs -mt-0.5 flex flex-1 justify-center font-semibold ' +
                  (router.pathname === '/events'
                    ? 'text-indigo-600 '
                    : 'text-gray-400')
                }
              >
                Events
              </span>
            </a>
          </Link>
          {/** Teamup */}
          <Link href="/openings" passHref>
            <a className="text-gray-600 focus:text-indigo-500 hover:text-indigo-500 py-0.5 px-1.5">
              <span className="flex justify-center items-center">
                <JoinIcon
                  isActive={router.pathname === '/openings'}
                  size={26}
                />
              </span>
              <span
                className={
                  'text-xs -mt-0.5 -ml-1.5 flex flex-1 justify-center font-semibold ' +
                  (router.pathname === '/openings'
                    ? 'text-indigo-600 '
                    : 'text-gray-400')
                }
              >
                Team Up
              </span>
            </a>
          </Link>

          {/** Page */}
          <Link href={pageId ? `/page/${pageId}` : `/page`} passHref>
            <a className="text-gray-600 focus:text-indigo-500 hover:text-indigo-500 py-0.5 px-1.5">
              <span className="flex justify-center items-center pt-0.5">
                <PageIcon
                  isActive={
                    router.pathname === '/page/[pageId]/events' ||
                    router.pathname === '/page/[pageId]' ||
                    router.pathname === '/page' ||
                    router.pathname === '/page/create'
                  }
                  size={26}
                />
              </span>
              <span
                className={
                  'text-xs -mt-0.5 flex flex-1 justify-center font-semibold ' +
                  (router.pathname === '/page/[pageId]/events' ||
                  router.pathname === '/page/[pageId]' ||
                  router.pathname === '/page' ||
                  router.pathname === '/page/create'
                    ? 'text-indigo-600 '
                    : 'text-gray-400')
                }
              >
                Org
              </span>
            </a>
          </Link>

          {/** People */}
          <Link href="/people" passHref>
            <a className="text-gray-600 focus:text-indigo-500 hover:text-indigo-500 py-0.5 px-1.5">
              <span className="flex justify-center items-center pt-0.5">
                <FriendsIcon
                  isActive={router.pathname === '/people'}
                  size={28}
                />
              </span>
              <span
                className={
                  'text-xs -mt-1 flex flex-1 justify-center font-semibold ' +
                  (router.pathname === '/people'
                    ? 'text-indigo-600 '
                    : 'text-gray-400')
                }
              >
                People
              </span>
            </a>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default BottomNavigationBar;
