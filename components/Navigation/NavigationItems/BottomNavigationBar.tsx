import { useRouter } from 'next/router';
import Link from 'next/link';
import OrganizationIcon from '../../UI/Icons/NavIcons/OrganizationIcon';
import MessageIcon from '../../UI/Icons/NavIcons/MessageIcon';
import FriendsIcon from '../../UI/Icons/NavIcons/FriendsIcon';
import TrophyIcon from '../../UI/Icons/NavIcons/TrophyIcon';
import { useAuth } from '../../../context/authContext';

function BottomNavigationBar() {
  const {
    userData: { linkedOrganizationId },
  } = useAuth();
  const router = useRouter();
  return (
    <div className="md:hidden w-full h-screen font-sans">
      <section
        id="bottom-navigation"
        className="block bg-black fixed inset-x-0 bottom-0 z-10 shadow"
      >
        <div className="flex w-full justify-evenly">
          <Link href="/" passHref>
            <a className="py-1 px-4 sm:px-8 text-gray-600 focus:text-indigo-500 hover:text-indigo-500">
              <TrophyIcon isActive={router.pathname === '/'} size={30} />
            </a>
          </Link>
          <Link
            href={
              linkedOrganizationId
                ? `/organization/${linkedOrganizationId}/events`
                : `/organization`
            }
            passHref
          >
            <a className="py-1 px-4 sm:px-8 text-gray-600 focus:text-indigo-500 hover:text-indigo-500">
              <OrganizationIcon
                isActive={
                  router.pathname === '/organization/[orgId]/events' ||
                  router.pathname === '/organization/[orgId]' ||
                  router.pathname === '/organization' ||
                  router.pathname === '/organization/create'
                }
                size={30}
              />
            </a>
          </Link>
          <Link href="/friends" passHref>
            <a className="py-1 px-4 sm:px-8 text-gray-600 focus:text-indigo-500 hover:text-indigo-500">
              <FriendsIcon
                isActive={router.pathname === '/friends'}
                size={30}
              />
            </a>
          </Link>
          <Link href="/join" passHref>
            <a className="py-1 px-4 sm:px-8 text-gray-600 focus:text-indigo-500 hover:text-indigo-500">
              <FriendsIcon isActive={router.pathname === '/join'} size={30} />
            </a>
          </Link>
          <Link href="/messages" passHref>
            <a className="py-1 px-4 sm:px-8 text-gray-600 focus:text-indigo-500 hover:text-indigo-500">
              <MessageIcon
                isActive={router.pathname === '/messages'}
                size={30}
              />
            </a>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default BottomNavigationBar;
