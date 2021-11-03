import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import localforage from 'localforage';
import NavigationItem from './NavigationItem/NavigationItem';
import { useAuth } from '../../../context/authContext';
import NotificationIcon from '../../UI/Icons/NavIcons/NotificationIcon';
import ProfileIcon from '../../UI/Icons/NavIcons/ProfileIcon';

export default function SecondaryNavigationItems() {
  const { userData } = useAuth();
  const router = useRouter();
  const [isUser, setIsUser] = useState(true);

  useEffect(() => {
    if (userData) {
      setIsUser(true);
    } else {
      setIsUser(false);
    }
  }, [userData]);

  const handleButtonClick = async () => {
    await router.push('/auth');
  };

  return (
    <ul className="flex items-end lg:space-x-1">
      {isUser ? (
        <>
          <NavigationItem
            href="/notification"
            isActive={router.pathname === '/notification'}
            toolTip="Notification"
          >
            <NotificationIcon
              isActive={router.pathname === '/notification'}
              size={36}
            />
          </NavigationItem>
          <NavigationItem
            href={`/profile/${userData.username}`}
            isActive={
              router.pathname === '/profile/[username]' ||
              router.pathname === '/profile/[username]/teams' ||
              router.pathname === '/profile/[username]/edit' ||
              router.pathname === '/profile/[username]/games'
            }
            toolTip="Profile"
          >
            <ProfileIcon
              isActive={
                router.pathname === '/profile/[username]' ||
                router.pathname === '/profile/[username]/teams' ||
                router.pathname === '/profile/[username]/edit'
              }
              size={36}
            />
          </NavigationItem>
        </>
      ) : (
        <div
          className={
            'bg-indigo-600 hover:bg-indigo-800 font-semibold ' +
            'text-md my-1.5 md:my-2 py-2 px-2 text-gray-300 rounded-md cursor-pointer'
          }
          onClick={handleButtonClick}
        >
          Sign&nbsp;In/ Sign&nbsp;Up
        </div>
      )}
    </ul>
  );
}
