import { useRouter } from 'next/router';
import NavigationItem from './NavigationItem/NavigationItem';
import OrganizationIcon from '../../UI/Icons/NavIcons/Organization';
import TrophyIcon from '../../UI/Icons/NavIcons/Trophy';
import ForumIcon from '../../UI/Icons/NavIcons/Forum';
import { useAuth } from '../../../context/authContext';

export default function PrimaryNavigationItems() {
  const {
    userData: { linkedOrganizationId },
  } = useAuth();
  const router = useRouter();

  return (
    <ul className="hidden md:flex items-end space-x-12 mr-20">
      <NavigationItem
        href="/"
        isActive={router.pathname === '/'}
        toolTip="Events"
      >
        <TrophyIcon isActive={router.pathname === '/'} size={36} />
      </NavigationItem>
      <NavigationItem
        href={
          linkedOrganizationId
            ? `/organization/${linkedOrganizationId}/tournaments`
            : `/organization`
        }
        isActive={
          router.pathname === '/organization/[orgId]/tournaments' ||
          router.pathname === '/organization/[orgId]' ||
          router.pathname === '/organization' ||
          router.pathname === '/organization/create'
        }
        toolTip="Organization"
      >
        <OrganizationIcon
          isActive={
            router.pathname === '/organization/[orgId]/tournaments' ||
            router.pathname === '/organization/[orgId]' ||
            router.pathname === '/organization' ||
            router.pathname === '/organization/create'
          }
          size={36}
        />
      </NavigationItem>
      <NavigationItem
        href="/contact"
        isActive={router.pathname === '/contact'}
        toolTip="Feedback"
      >
        <ForumIcon isActive={router.pathname === '/contact'} size={36} />
      </NavigationItem>
    </ul>
  );
}
