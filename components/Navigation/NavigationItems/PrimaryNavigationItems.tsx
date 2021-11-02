import { useRouter } from 'next/router';
import NavigationItem from './NavigationItem/NavigationItem';
import OrganizationIcon from '../../UI/Icons/NavIcons/OrganizationIcon';
import TrophyIcon from '../../UI/Icons/NavIcons/TrophyIcon';
import MessageIcon from '../../UI/Icons/NavIcons/MessageIcon';
import FriendsIcon from '../../UI/Icons/NavIcons/FriendsIcon';
import { useAuth } from '../../../context/authContext';

export default function PrimaryNavigationItems() {
  const {
    userData: { linkedOrganizationId },
    receivedFriendRequests,
  } = useAuth();
  const router = useRouter();

  return (
    <ul className="hidden md:flex items-end lg:space-x-10 lg:mr-20">
      <NavigationItem
        href="/"
        isActive={router.pathname === '/'}
        toolTip="Events"
      >
        <TrophyIcon isActive={router.pathname === '/'} size={40} />
      </NavigationItem>
      <NavigationItem
        href={
          linkedOrganizationId
            ? `/organization/${linkedOrganizationId}/events`
            : `/organization`
        }
        isActive={
          router.pathname === '/organization/[orgId]/events' ||
          router.pathname === '/organization/[orgId]' ||
          router.pathname === '/organization' ||
          router.pathname === '/organization/create'
        }
        toolTip="Organization"
      >
        <OrganizationIcon
          isActive={
            router.pathname === '/organization/[orgId]/events' ||
            router.pathname === '/organization/[orgId]' ||
            router.pathname === '/organization' ||
            router.pathname === '/organization/create'
          }
          size={36}
        />
      </NavigationItem>
      <NavigationItem
        href="/friends"
        isActive={router.pathname === '/friends'}
        toolTip="Friends"
      >
        <div className="flex justify-center">
          <FriendsIcon isActive={router.pathname === '/friends'} size={36} />
          {receivedFriendRequests.length > 0 ? (
            <span
              className={
                'badge mb-4 bg-red-500 rounded-full p-1 text-center object-right-top ' +
                'text-white text-xs -left-10'
              }
            >
              {receivedFriendRequests.length}
            </span>
          ) : null}
        </div>
      </NavigationItem>
      <NavigationItem
        href="/messages"
        isActive={router.pathname === '/messages'}
        toolTip="Messages"
      >
        <MessageIcon isActive={router.pathname === '/messages'} size={36} />
      </NavigationItem>
    </ul>
  );
}
