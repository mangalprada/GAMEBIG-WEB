import { useState, useEffect } from 'react';
import Head from 'next/head';
import ProfileCard from '../../../components/Friends/ProfileCard';
import TabNavigator from '../../../components/Navigation/TabNavigation/TabNavigator';
import { useAuth } from '../../../context/authContext';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import { db } from 'firebase/firebaseClient';

const Friends = () => {
  const { userData } = useAuth();
  const [friends, setFriends] = useState([]);

  // useEffect(() => {
  //   const getFriends = async () => {
  //     const friendsData = db.collection('')
  //     setFriends(friendsData);
  //   };
  //   getFriends();
  // }, []);

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
      <div className="flex flex-col">
        <div className="mt-2">
          <TabNavigator tabs={tabs} />
        </div>
        <span className="text-left px-8 text-xl font-semibold text-gray-100  py-2 mt-1">
          My Friends
        </span>
        {/* <div className="w-11/12 md:w-2/3 flex flex-wrap gap-2 mt-4 pt-1 ">
          {friends.map((friend) => (
            <div key={suggestion.uid}>
              <ProfileCard
                name={suggestion.name}
                about={suggestion.about}
                games={[]}
                username={suggestion.username}
                photoURL={suggestion.photoURL}
                uid={suggestion.uid}
              />
            </div>
          ))}
        </div> */}
      </div>
    </Aux>
  );
};

export default Friends;
