import { useRouter } from 'next/router';
import NavigationItem from './NavigationItem/NavigationItem';
import PageIcon from '../../UI/Icons/NavIcons/PageIcon';
import TrophyIcon from '../../UI/Icons/NavIcons/TrophyIcon';
import MessageIcon from '../../UI/Icons/NavIcons/MessageIcon';
import FriendsIcon from '../../UI/Icons/NavIcons/FriendsIcon';
import JoinIcon from '../../UI/Icons/NavIcons/JoinIcon';
import { useAuth } from '../../../context/authContext';
import { useMessages } from '@/context/messageContext';

export default function PrimaryNavigationItems() {
  const {
    userData: { linkedPageId },
  } = useAuth();
  const router = useRouter();
  const { unseen } = useMessages();

  return (
    <ul className="hidden md:flex items-end lg:space-x-10 lg:mr-20">
      <NavigationItem
        href="/openings"
        isActive={router.pathname === '/openings'}
        toolTip="Openings"
      >
        <JoinIcon isActive={router.pathname === '/'} size={33} />
      </NavigationItem>
      <NavigationItem
        href="/events"
        isActive={router.pathname === '/events'}
        toolTip="Events"
      >
        <TrophyIcon isActive={router.pathname === '/events'} size={33} />
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
        href="/messages"
        isActive={router.pathname === '/messages'}
        toolTip="Messages"
      >
        <div>
          <MessageIcon isActive={router.pathname === '/messages'} size={33} />
          {unseen > 0 ? (
            <div className="fixed mt-[-1.5rem] ml-[1.2rem] rounded-full h-6 w-6 bg-red-500">
              <span className="text-white text-sm">{unseen}</span>
            </div>
          ) : null}
        </div>
      </NavigationItem>
    </ul>
  );
}
