import { Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/router';
import { db } from '../../firebase/firebaseClient';
import { useAuth } from '@/context/authContext';
import MessageRoom from './MessageRoom';
import FixedButton from '../UI/Buttons/FixedButton';
import { MessageRoomType } from '@/utilities/messages/MessagesTypes';
import { useMessages } from '@/context/messageContext';

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
  const { updateCurrentMessageRoom } = useMessages();

  const openPeoplePage = () => {
    router.push('/people');
  };

  const updateUnseenMessageCount = async (room: any) => {
    try {
      await db
        .collection('messageRooms')
        .doc(room.docId)
        .update({
          unseen: {
            ...room.unseen,
            [userData.uid]: 0,
          },
        });
    } catch (error) {
      console.log(error);
    }
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
    updateCurrentMessageRoom(room);
    updateUnseenMessageCount(room);
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
          noOfUnseen={room.noOfUnseen}
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
        {messageRooms.length > 0 ? (
          <div className="h-full overflow-auto pr-1">
            {messageRoomsComponent}
          </div>
        ) : (
          <div className="flex justify-center">
            <h2 className="font-semibold mx-auto text-center text-xl text-gray-500 mt-4">
              No Messages !!
            </h2>
            );
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
