import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/authContext';
import { db } from '../../firebase/firebaseClient';

const FriendhipButtons = ({
  profilePageUsername,
  profilePagePhotoURL,
  profilePageName,
}: {
  profilePagePhotoURL?: string;
  profilePageName?: string;
  profilePageUsername: string;
}) => {
  const { userData } = useAuth();
  const router = useRouter();
  const [isFriend, setIsFriend] = React.useState(false);

  useEffect(() => {
    if (userData.username && profilePageName)
      db.collection('friends')
        .where('username', '==', userData.username)
        .where('friendUsername', '==', profilePageUsername)
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.size > 0) {
            setIsFriend(true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-center gap-2 md:gap-4">
      {isFriend ? (
        <span className="text-gray-300 font-sans font-bold">Friends</span>
      ) : (
        <span
          className="text-white font-normal  text-lg py-2 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 cursor-pointer"
          onClick={() => {
            console.log('clicked');
          }}
        >
          Add Friend
        </span>
      )}
      <span
        className="text-white font-normal  text-lg py-2 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 cursor-pointer"
        onClick={() => {
          const stringifiedData: string = JSON.stringify({
            username: profilePageUsername,
            name: profilePageName,
            photoURL: profilePagePhotoURL,
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

export default FriendhipButtons;
