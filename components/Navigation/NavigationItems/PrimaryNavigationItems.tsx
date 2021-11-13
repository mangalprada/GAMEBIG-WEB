import { useRouter } from 'next/router';
import NavigationItem from './NavigationItem/NavigationItem';
import OrganizationIcon from '../../UI/Icons/NavIcons/OrganizationIcon';
import TrophyIcon from '../../UI/Icons/NavIcons/TrophyIcon';
import MessageIcon from '../../UI/Icons/NavIcons/MessageIcon';
import FriendsIcon from '../../UI/Icons/NavIcons/FriendsIcon';
import JoinIcon from '../../UI/Icons/NavIcons/JoinIcon';
import { useAuth } from '../../../context/authContext';

export default function PrimaryNavigationItems() {
  const {
    userData: { linkedOrganizationId },
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
        href="/people"
        isActive={router.pathname === '/people'}
        toolTip="People"
      >
        <FriendsIcon isActive={router.pathname === '/people'} size={36} />
      </NavigationItem>
      <NavigationItem
        href="/join"
        isActive={router.pathname === '/join'}
        toolTip="Join"
      >
        <JoinIcon isActive={router.pathname === '/join'} size={33} />
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
