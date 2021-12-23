import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/authContext';
import { useUI } from '@/context/uiContext';
import { follow, isFollowing, unfollow } from '../../libs/follow';
import FollowButton from '../UI/Buttons/FollowButton';
import ProfileIcon from '../UI/Icons/NavIcons/ProfileIcon';
import { BasicUserType, UserData } from '@/utilities/types';

type Props = {
  user: UserData | BasicUserType;
};

const ProfileCard: FC<Props> = ({ user }) => {
  const { userData } = useAuth();
  const { openSnackBar } = useUI();
  const router = useRouter();
  const [following, setFollowing] = useState<boolean>(false);

  const fullName =
    user.name && user.name.length > 15
      ? user.name.slice(0, 15) + '...'
      : user.name;

  useEffect(() => {
    const checkFollowing = async () => {
      const val = await isFollowing(userData.uid, user.uid);
      setFollowing(val);
    };
    if (userData.uid) {
      checkFollowing();
    }
  }, [user.uid, userData.uid]);

  function handleFollow() {
    const follower = {
      name: userData.name,
      photoURL: userData.photoURL ? userData.photoURL : null,
      username: userData.username,
      uid: userData.uid,
    };
    const followee = {
      photoURL: user.photoURL ? user.photoURL : null,
      username: user.username,
      name: user.name,
      uid: user.uid,
    };
    follow(follower, followee);
    openSnackBar({
      message: `You are Following ${name}`,
      type: 'success',
      label: '',
    });
    setFollowing(true);
  }

  function handleUnFollow() {
    unfollow(userData.uid, user.uid);
    setFollowing(false);
  }

  function onProfileCardClick() {
    router.push(`/profile/${user.username}`);
  }

  return (
    <div
      className={
        'bg-gray-900 py-4 rounded-lg shadow-lg text-center ' +
        'md:hover:-translate-y-0.5'
      }
    >
      {/** Profile Pic */}
      {user.photoURL ? (
        <section className="mb-3 h-20 w-20 md:h-40 md:w-40 relative mx-auto">
          <Image
            src={user.photoURL}
            alt="Profile Picture"
            layout="fill"
            objectFit="contain"
            className="rounded-full cursor-pointer"
            onClick={onProfileCardClick}
          />
        </section>
      ) : (
        <section
          className={
            'cursor-pointer flex justify-center items-center ' +
            'h-20 w-20 md:h-40 md:w-40 mx-auto mb-3'
          }
        >
          <ProfileIcon size={100} isActive={false} />
        </section>
      )}

      {/** Name and UserName */}
      <section
        className="flex flex-col cursor-pointer"
        onClick={onProfileCardClick}
      >
        <span
          className={
            'text-gray-200 hover:underline sm:text-lg text-sm font-semibold'
          }
          title={user.name}
        >
          {user.name ? fullName : 'NA'}
        </span>
        <span className="text-gray-400 text-xs sm:text-base font-medium">
          @{user.username}
        </span>
      </section>

      {/** Follow Button */}
      {following ? (
        <div>
          <div
            className={
              'flex justify-center items-center mx-auto mt-3 w-3/4 ' +
              'bg-green-500/30 hover:bg-green-300/20 cursor-default ' +
              'rounded-md py-1'
            }
          >
            <span className={'font-sans text-green-100 text-lg font-semibold'}>
              Following
            </span>
          </div>
          <span
            className={'font-sans text-green-100 text-xs font-semibold'}
            onClick={handleUnFollow}
          >
            Unfollow
          </span>
        </div>
      ) : (
        <FollowButton name="Follow" onClick={handleFollow} />
      )}
    </div>
  );
};

export default ProfileCard;
