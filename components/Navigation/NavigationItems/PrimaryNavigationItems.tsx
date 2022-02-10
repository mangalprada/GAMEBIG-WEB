import { useRouter } from 'next/router';
import NavigationItem from './NavigationItem/NavigationItem';
import PageIcon from '../../UI/Icons/NavIcons/PageIcon';
import TrophyIcon from '../../UI/Icons/NavIcons/TrophyIcon';
import ExploreIcon from '../../UI/Icons/NavIcons/ExploreIcon';
import JoinIcon from '../../UI/Icons/NavIcons/JoinIcon';
import { useAuth } from '@/context/authContext';

export default function PrimaryNavigationItems() {
  const router = useRouter();
  const {
    userData: { linkedPageIds },
  } = useAuth();

  const pageId = linkedPageIds ? linkedPageIds[0] : null;

  return (
    <ul className="hidden md:flex items-end lg:space-x-10 lg:mr-20">
      <NavigationItem
        href="/events"
        isActive={router.pathname === '/events'}
        toolTip="Events"
      >
        <TrophyIcon isActive={router.pathname === '/events'} size={33} />
      </NavigationItem>
      <NavigationItem
        href="/openings"
        isActive={router.pathname === '/openings'}
        toolTip="Team Up"
      >
        <JoinIcon isActive={router.pathname === '/openings'} size={33} />
      </NavigationItem>

      <NavigationItem
        href={pageId ? `/page/${pageId}` : `/page`}
        isActive={
          router.pathname === '/page/[pageId]/events' ||
          router.pathname === '/page/[pageId]' ||
          router.pathname === '/page' ||
          router.pathname === '/page/create'
        }
        toolTip="Org"
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
        href="/explore"
        isActive={router.pathname === '/explore'}
        toolTip="Explore"
      >
        <ExploreIcon isActive={router.pathname === '/explore'} size={30} />
      </NavigationItem>
    </ul>
  );
}
