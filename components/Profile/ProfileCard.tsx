import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/authContext';
import { useUI } from '@/context/uiContext';
import { follow, isFollowing } from '../../libs/follow';
import FollowButton from '../UI/Buttons/FollowButton';
import ProfileIcon from '../UI/Icons/NavIcons/ProfileIcon';

type Props = {
  photoURL: string | undefined;
  name: string | undefined;
  username: string;
  uid: string;
};

const ProfileCard: FC<Props> = ({ photoURL, username, uid, name }) => {
  const { userData } = useAuth();
  const { openSnackBar } = useUI();
  const router = useRouter();
  const [following, setFollowing] = useState<boolean>(false);

  const fullName = name && name.length > 14 ? name.slice(0, 15) + '...' : name;

  useEffect(() => {
    const checkFollowing = async () => {
      const val = await isFollowing(userData.uid, uid);
      setFollowing(val);
    };
    if (userData.uid) {
      checkFollowing();
    }
  }, [uid, userData.uid]);

  function handleFollow() {
    follow({
      follower: {
        name: userData.name as string,
        photoURL: userData.photoURL as string,
        username: userData.username,
        uid: userData.uid,
      },
      followee: {
        photoURL: photoURL as string,
        username,
        name: name as string,
        uid: uid as string,
      },
    });
    openSnackBar({
      message: `You are Following ${name}`,
      type: 'success',
      label: '',
    });
    setFollowing(true);
  }

  function onProfileCardClick() {
    router.push(`/profile/${username}`);
  }

  return (
    <div
      className={
        'bg-gray-900 py-4 rounded-lg shadow-lg text-center ' +
        'md:hover:-translate-y-0.5'
      }
    >
      {/** Profile Pic */}
      {photoURL ? (
        <section className="mb-3 h-20 w-20 md:h-40 md:w-40 relative mx-auto">
          <Image
            src={photoURL}
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
          title={name}
        >
          {name ? fullName : 'NA'}
        </span>
        <span className="text-gray-400 text-xs sm:text-base font-medium">
          @{username}
        </span>
      </section>

      {/** Follow Button */}
      {following ? (
        <div
          className={
            'flex justify-center items-center mx-auto mt-3 w-3/4 ' +
            'bg-green-500/30 hover:bg-green-300/20 cursor-default ' +
            'rounded-md py-1'
          }
        >
          <span
            className={'font-sans text-green-100 text-lg font-semibold'}
            onClick={() => {
              throw new Error('Sentry Frontend Error');
            }}
          >
            Following
          </span>
        </div>
      ) : (
        <FollowButton name="Follow" onClick={handleFollow} />
      )}
    </div>
  );
};

export default ProfileCard;
