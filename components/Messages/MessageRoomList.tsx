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
import { MessageRoomType } from '@/utilities/messages/MessagesTypes';

type Props = {
  setReceiver: (user: any) => void;
  setMessageRoomId: Dispatch<SetStateAction<string>>;
  setShowMsgContainer: Dispatch<SetStateAction<boolean>>;
  isSmallScreen: boolean;
  showMsgContainer: boolean;
  messageRooms: MessageRoomType[];
};

const MessageRoomList = ({
  setReceiver,
  setMessageRoomId,
  setShowMsgContainer,
  isSmallScreen,
  showMsgContainer,
  messageRooms,
}: Props) => {
  const router = useRouter();
  const { userData } = useAuth();
  const [query, setQuery] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [searchResults, setSearchResults] = useState([]);

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
      name: room.receiver[userData.uid].name,
      username: room.receiver[userData.uid].username,
      photoURL: room.receiver[userData.uid].photoURL,
      uid: room.receiver[userData.uid].uid,
    });
    setMessageRoomId(room.docId);
    setShowMsgContainer(true);
  };

  const messageRoomsComponent = messageRooms.map((room: any, index: number) => {
    return (
      <div key={index}>
        <MessageRoom
          receiverName={room.receiver[userData.uid].name}
          receiverUsername={room.receiver[userData.uid].username}
          receiverPhotoURL={room.receiver[userData.uid].photoURL}
          receiverUid={room.receiver[userData.uid].uid}
          lastMessage={room.lastMessage}
          updatedAt={room.updatedAt}
          onClick={() => {
            clickHandler(room);
          }}
        />
      </div>
    );
  });

  if (isSmallScreen && showMsgContainer) return null;

  return (
    <div className="w-full md:w-1/3 h-full px-1">
      <div className="w-full h-full">
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
          <div className="h-full overflow-auto pr-1">
            {messageRoomsComponent}
          </div>
        ) : (
          <div className="flex justify-center">
            <FixedButton
              name="Find People To Message"
              onClick={openPeoplePage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageRoomList;
