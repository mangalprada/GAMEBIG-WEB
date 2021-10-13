import { useRouter } from 'next/router';
import NavigationItem from './NavigationItem/NavigationItem';
import { useAuth } from '../../../context/authContext';
import NotificationIcon from '../../UI/Icons/NavIcons/Notification';
import ProfileIcon from '../../UI/Icons/NavIcons/Profile';

export default function SecondaryNavigationItems() {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <ul className="flex items-center space-x-2">
      {user.username ? (
        <>
          <NavigationItem href="/notification">
            <NotificationIcon
              isActive={router.pathname === '/notification'}
              size={36}
            />
          </NavigationItem>
          <NavigationItem href={`/profile/${user.username}`}>
            <ProfileIcon
              isActive={
                router.pathname === '/profile/[username]' ||
                router.pathname === '/profile/[username]/teams'
              }
              size={36}
            />
          </NavigationItem>
        </>
      ) : (
        <NavigationItem href="/auth">Sign&nbsp;In/ Sign&nbsp;Up</NavigationItem>
      )}
    </ul>
  );
}
