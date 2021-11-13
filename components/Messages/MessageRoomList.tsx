import {
  ChangeEvent,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';
import { useRouter } from 'next/router';
import { db } from '../../firebase/firebaseClient';
import { useAuth } from '@/context/authContext';
import SearchInput from '@/components/UI/Inputs/SearchInput';
import algoliaClient from '@/libs/algolia';
import debounce from '@/libs/debounce';
import MessageRoom from './MessageRoom';
import FixedButton from '../UI/Buttons/FixedButton';

type Props = {
  setReceiver: (user: any) => void;
  setMessageRoomId: Dispatch<SetStateAction<string>>;
  setShowMsgContainer: Dispatch<SetStateAction<boolean>>;
  isSmallScreen: boolean;
  showMsgContainer: boolean;
};

const MessageRoomList = ({
  setReceiver,
  setMessageRoomId,
  setShowMsgContainer,
  isSmallScreen,
  showMsgContainer,
}: Props) => {
  const router = useRouter();
  const { userData } = useAuth();
  const [query, setQuery] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [messageRooms, setMessageRooms] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (userData.uid)
      db.collection('messageRooms')
        .where('uids', 'array-contains', userData.uid)
        .get()
        .then((snapshot) => {
          const rooms = snapshot.docs.map((doc) => ({
            ...doc.data(),
            docId: doc.id,
          }));
          setMessageRooms(rooms as any);
        });
  }, [userData.uid]);

  const searchUser = (query: string) => {
    const index = algoliaClient.initIndex('messageRooms');
    index.search(query).then(({ hits }) => {
      console.log(hits);
    });
  };

  const openPeoplePage = () => {
    router.push('/people');
  };

  const clickHandler = (room: any) => {
    setReceiver({
      name: room.userDetails[userData.username].name,
      username: room.userDetails[userData.username].username,
      photoURL: room.userDetails[userData.username].photoURL,
    });
    setMessageRoomId(room.docId);
    setShowMsgContainer(true);
  };

  if (isSmallScreen && showMsgContainer) return null;

  return (
    <div className="w-full md:w-1/3 h-full px-1">
      <div className="w-full h-full pt-2">
        {/* <SearchInput
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
              setSearchResults([]);
            }
          }}
          placeHolder="Search"
          value={query}
          error={Boolean(errorMsg)}
          errorMessage={errorMsg}
        /> */}
        {messageRooms.length > 0 ? (
          <div className="h-full overflow-auto pr-3">
            {messageRooms.map((room: any, index: number) => {
              return (
                <div key={index}>
                  <MessageRoom
                    receiverName={room.userDetails[userData.username].name}
                    receiverUsername={
                      room.userDetails[userData.username].username
                    }
                    receiverPhotoURL={
                      room.userDetails[userData.username].photoURL
                    }
                    lastMessage={room.lastMessage}
                    onClick={() => {
                      clickHandler(room);
                    }}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <FixedButton name="Find People To Message" onClick={openPeoplePage} />
        )}
      </div>
    </div>
  );
};

export default MessageRoomList;
