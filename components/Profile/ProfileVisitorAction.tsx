import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/authContext';
import { follow, isFollowing } from '@/libs/follow';
import { useUI } from '@/context/uiContext';

const ProfileVisitorAction = ({
  profilePageUsername,
  profilePagePhotoURL,
  profilePageName,
  profilePageUid,
}: {
  profilePagePhotoURL?: string;
  profilePageName?: string;
  profilePageUsername: string;
  profilePageUid: string;
}) => {
  const { userData } = useAuth();
  const { openSnackBar } = useUI();
  const router = useRouter();
  const [following, setFollowing] = useState<boolean>(false);

  useEffect(() => {
    const checkFollowing = async () => {
      const val = await isFollowing(userData.uid, profilePageUid);
      setFollowing(val);
    };
    if (userData.uid) {
      checkFollowing();
    }
  }, [profilePageUid, userData.uid]);

  return (
    <div className="flex flex-col items-center gap-2 md:gap-4">
      {following ? (
        <span className="text-gray-300 font-sans font-bold">Following</span>
      ) : (
        <span
          className="text-white font-normal  text-lg py-2 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 cursor-pointer"
          onClick={() => {
            const follower = {
              name: userData.name as string,
              photoURL: userData.photoURL as string,
              username: userData.username,
              uid: userData.uid,
            };
            const followee = {
              photoURL: profilePagePhotoURL,
              username: profilePageUsername,
              name: profilePageName,
              uid: profilePageUid,
            };
            follow(follower, followee);
            openSnackBar({
              message: `You are Following ${profilePageUsername}`,
              type: 'success',
              label: '',
            });
            setFollowing(true);
          }}
        >
          Follow
        </span>
      )}
      <span
        className="text-white font-normal  text-lg py-2 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 cursor-pointer"
        onClick={() => {
          const stringifiedData: string = JSON.stringify({
            username: profilePageUsername,
            name: profilePageName,
            photoURL: profilePagePhotoURL,
            uid: profilePageUid,
          });
          router.push({
            pathname: `/messages`,
            query: { receiver: stringifiedData },
          });
        }}
      >
        Message
      </span>
    </div>
  );
};

export default ProfileVisitorAction;
