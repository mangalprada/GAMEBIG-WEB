import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import NavigationItem from './NavigationItem/NavigationItem';
import { useAuth } from '../../../context/authContext';
import { useNotication } from '../../../context/notificationContext';
import { useMessages } from '../../../context/messageContext';
import NotificationIcon from '../../UI/Icons/NavIcons/NotificationIcon';
import ProfileIcon from '../../UI/Icons/NavIcons/ProfileIcon';
import MessageIcon from '../../UI/Icons/NavIcons/MessageIcon';

export default function SecondaryNavigationItems() {
  const { userData } = useAuth();
  const { unseen } = useNotication();
  const { unseenMessageCount } = useMessages();
  const router = useRouter();
  const [isUser, setIsUser] = useState(true);

  useEffect(() => {
    if (userData.username) {
      setIsUser(true);
    } else {
      setIsUser(false);
    }
  }, [userData]);

  return (
    <ul className="flex items-end lg:space-x-1">
      {isUser ? (
        <>
          <NavigationItem
            href="/messages"
            isActive={router.pathname === '/messages'}
            toolTip="Messages"
          >
            <div>
              <MessageIcon
                isActive={router.pathname === '/messages'}
                size={36}
              />
              {unseenMessageCount > 0 ? (
                <div className="fixed mt-[-1.5rem] ml-[1.2rem] rounded-full h-6 w-6 bg-red-500">
                  <span className="text-white text-sm">
                    {unseenMessageCount}
                  </span>
                </div>
              ) : null}
            </div>
          </NavigationItem>
          <NavigationItem
            href="/notification"
            isActive={router.pathname === '/notification'}
            toolTip="Notification"
          >
            <div>
              <NotificationIcon
                isActive={router.pathname === '/notification'}
                size={36}
              />
              {unseen > 0 ? (
                <div className="fixed mt-[-1.5rem] ml-[1.2rem] rounded-full h-6 w-6 bg-red-500">
                  <span className="text-gray-50 text-sm">{unseen}</span>
                </div>
              ) : null}
            </div>
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
            <>
              {userData.photoURL ? (
                <div className="relative h-8 w-8 my-0.5 cursor-pointer">
                  <Image
                    src={userData.photoURL}
                    alt="Picture of a friend"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                  />
                </div>
              ) : (
                <ProfileIcon
                  isActive={
                    router.pathname === '/profile/[username]' ||
                    router.pathname === '/profile/[username]/teams' ||
                    router.pathname === '/profile/[username]/edit'
                  }
                  size={36}
                />
              )}
            </>
          </NavigationItem>
        </>
      ) : (
        <Link href="/">
          <a
            className={
              'font-semibold text-md md:my-0.5 py-2 px-2 text-gray-300  cursor-pointer '
            }
          >
            <div className="flex gap-3">
              <div className="ring ring-indigo-600 bg-slate-900 hover:bg-indigo-600 text-base md:text-xl text-50 px-2 md:px-4 py-0.5 md:py-1 rounded-md">
                Sign In
              </div>
              <div className="ring ring-indigo-600 hover:ring-indigo-800 bg-indigo-600 hover:bg-indigo-800 text-white text-base md:text-xl px-2 md:px-4 py-0.5 md:py-1 rounded-md">
                Sign Up
              </div>
            </div>
          </a>
        </Link>
      )}
    </ul>
  );
}
