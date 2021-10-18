import { useRouter } from 'next/router';
import Link from 'next/link';
import OrganizationIcon from '../../UI/Icons/NavIcons/OrganizationIcon';
import ForumIcon from '../../UI/Icons/NavIcons/ForumIcon';
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
          <div className="pt-1 pb-1 ">
            <Link href="/" passHref>
              <a className="justify-center inline-block text-center text-gray-600 focus:text-indigo-500 hover:text-indigo-500">
                <TrophyIcon isActive={router.pathname === '/'} size={38} />
              </a>
            </Link>
          </div>
          <div className="pt-2 pb-1">
            <Link
              href={
                linkedOrganizationId
                  ? `/organization/${linkedOrganizationId}/tournaments`
                  : `/organization`
              }
              passHref
            >
              <a className="text-gray-600 focus:text-indigo-500 hover:text-indigo-500">
                <OrganizationIcon
                  isActive={
                    router.pathname === '/organization/[orgId]/tournaments' ||
                    router.pathname === '/organization/[orgId]' ||
                    router.pathname === '/organization' ||
                    router.pathname === '/organization/create'
                  }
                  size={36}
                />
              </a>
            </Link>
          </div>
          <div className="pt-2 pb-1">
            <Link href="/contact" passHref>
              <a className="text-gray-600 focus:text-indigo-500 hover:text-indigo-500">
                <ForumIcon
                  isActive={router.pathname === '/contact'}
                  size={36}
                />
              </a>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default BottomNavigationBar;
