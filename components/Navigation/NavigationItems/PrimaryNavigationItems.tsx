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
        isActive={
          router.pathname === '/events' ||
          router.pathname === '/live' ||
          router.pathname === '/past'
        }
        toolTip="Events"
      >
        <TrophyIcon
          isActive={
            router.pathname === '/events' ||
            router.pathname === '/live' ||
            router.pathname === '/past'
          }
          size={33}
        />
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
        isActive={router.pathname.split('/').includes('page')}
        toolTip="Org"
      >
        <PageIcon
          isActive={router.pathname.split('/').includes('page')}
          size={33}
        />
      </NavigationItem>
      <NavigationItem
        href="/explore"
        isActive={router.pathname.split('/').includes('explore')}
        toolTip="Explore"
      >
        <ExploreIcon
          isActive={router.pathname.split('/').includes('explore')}
          size={30}
        />
      </NavigationItem>
    </ul>
  );
}
