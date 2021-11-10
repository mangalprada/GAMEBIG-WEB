import { useState, useEffect } from 'react';
import Head from 'next/head';
import ProfileCard from '../../../components/Friends/ProfileCard';
import TabNavigator from '../../../components/Navigation/TabNavigation/TabNavigator';
import { useAuth } from '../../../context/authContext';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import { db } from 'firebase/firebaseClient';
import { ProfileCardData } from '@/utilities/friends/friends';

const Friends = () => {
  const { userData } = useAuth();
  const [friends, setFriends] = useState<ProfileCardData[]>([]);

  useEffect(() => {
    const getFriends = async () => {
      const friendsList: ProfileCardData[] = [];
      const querySnapshot = await db
        .collection('users')
        .doc(userData.uid)
        .collection('friends')
        .get();
      querySnapshot.forEach((doc) => {
        friendsList.push(doc.data() as ProfileCardData);
      });
      setFriends(friendsList);
    };
    getFriends();
  }, [userData.uid]);

  const tabs = [
    {
      label: 'Suggestions',
      href: `/friends`,
      pathName: '/friends',
    },
    {
      label: 'Friends',
      href: `/friends/${userData.username}`,
      pathName: '/friends/[username]',
    },
  ];

  return (
    <Aux>
      <Head>
        <title>Friends</title>
        <meta name="description" content="Friends List" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <div className="flex flex-col justify-center">
        <div className="mt-2">
          <TabNavigator tabs={tabs} />
        </div>
        <div className="flex flex-col xl:w-1/2 md:w-5/6 rounded-lg py-4 mx-auto mt-1">
          <span className="text-left px-8 text-xl font-semibold text-gray-100  py-2 mt-1">
            My Friends
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {friends.map((friend) => (
              <div key={friend.uid}>
                <ProfileCard
                  name={friend.name}
                  games={[]}
                  username={friend.username}
                  photoURL={friend.photoURL}
                  uid={friend.uid}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Aux>
  );
};

export default Friends;
