import { ChangeEvent, useState, useEffect } from 'react';
import { useAuth } from '../../../context/authContext';
import { db } from '../../../firebase/firebaseClient';
import algoliaClient from '../../../lib/algolia';
import debounce from '../../../lib/debounce';
import { UserData } from '../../../utilities/types';
import SearchInput from '../../UI/Inputs/SearchInput';
import MessageRoom from './MessageRoom';

const MessageRoomList = ({
  setReceiver,
}: {
  setReceiver: (user: any) => void;
}) => {
  const { userData } = useAuth();
  const [query, setQuery] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [messageRooms, setMessageRooms] = useState<any>([]);

  useEffect(() => {
    db.collection('messageRooms')
      .where('usernames', 'array-contains', userData.username)
      .get()
      .then((snapshot) => {
        const rooms = snapshot.docs.map((doc) => ({
          ...(doc.data() as UserData),
          docId: doc.id,
        }));
        setMessageRooms(rooms);
      });
  }, [userData.username]);

  const searchUser = (query: string) => {
    const index = algoliaClient.initIndex('messageRooms');
    index
      .search(query, {
        attributesToRetrieve: ['name', 'username', 'photoURL'],
      })
      .then(({ hits }) => {
        setMessageRooms(hits);
      });
  };

  return (
    <div className="w-full md:w-1/3 h-full pt-2">
      <SearchInput
        name="searchUser"
        onChangeHandler={(e: ChangeEvent) => {
          const target = e.target as HTMLInputElement;
          setQuery(target.value);
          const debouncedGetSearch = debounce(
            () => searchUser(target.value),
            500
          );
          if (target.value.trim() !== '') {
            debouncedGetSearch();
          } else {
            setMessageRooms([]);
          }
        }}
        placeHolder="Search someone and send a message..."
        value={query}
        error={Boolean(errorMsg)}
        errorMessage={errorMsg}
      />
      <div className="h-full overflow-auto pr-3">
        {messageRooms.map((user: any, index: number) => {
          return (
            <div key={index}>
              <MessageRoom
                receiverName={user.name}
                receiverUsername={user.username}
                receiverPhotoURL={user.photoURL}
                onClick={() => {
                  setReceiver(user);
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MessageRoomList;
