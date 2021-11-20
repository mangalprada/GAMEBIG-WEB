import { useRouter } from 'next/router';
import NavigationItem from './NavigationItem/NavigationItem';
import PageIcon from '../../UI/Icons/NavIcons/PageIcon';
import TrophyIcon from '../../UI/Icons/NavIcons/TrophyIcon';
import MessageIcon from '../../UI/Icons/NavIcons/MessageIcon';
import FriendsIcon from '../../UI/Icons/NavIcons/FriendsIcon';
import JoinIcon from '../../UI/Icons/NavIcons/JoinIcon';
import { useAuth } from '../../../context/authContext';

export default function PrimaryNavigationItems() {
  const {
    userData: { linkedPageId },
  } = useAuth();
  const router = useRouter();

  return (
    <ul className="hidden md:flex items-end lg:space-x-10 lg:mr-20">
      <NavigationItem
        href="/"
        isActive={router.pathname === '/'}
        toolTip="Events"
      >
        <TrophyIcon isActive={router.pathname === '/'} size={33} />
      </NavigationItem>
      <NavigationItem
        href={linkedPageId ? `/page/${linkedPageId}/events` : `/page`}
        isActive={
          router.pathname === '/page/[pageId]/events' ||
          router.pathname === '/page/[pageId]' ||
          router.pathname === '/page' ||
          router.pathname === '/page/create'
        }
        toolTip="Page"
      >
        <PageIcon
          isActive={
            router.pathname === '/page/[pageId]/events' ||
            router.pathname === '/page/[pageId]' ||
            router.pathname === '/page' ||
            router.pathname === '/page/create'
          }
          size={33}
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
        <MessageIcon isActive={router.pathname === '/messages'} size={33} />
      </NavigationItem>
    </ul>
  );
}
