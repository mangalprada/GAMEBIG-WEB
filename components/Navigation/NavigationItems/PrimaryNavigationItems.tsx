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
    <ul className="hidden md:flex items-center space-x-12 mr-20">
      <NavigationItem href="/" toolTip="Events">
        <TrophyIcon isActive={router.pathname === '/'} size={40} />
      </NavigationItem>
      <NavigationItem
        href={
          linkedOrganizationId
            ? `/organization/${linkedOrganizationId}/tournaments`
            : `/organization`
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
          size={40}
        />
      </NavigationItem>
      <NavigationItem href="/contact" toolTip="Feedback">
        <ForumIcon isActive={router.pathname === '/contact'} size={40} />
      </NavigationItem>
    </ul>
  );
}
