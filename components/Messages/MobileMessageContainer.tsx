import {
  useEffect,
  useRef,
  useState,
  Dispatch,
  SetStateAction,
  FC,
} from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/authContext';
import Message from './Message';
import MessageInput from './MessageInput';
import { db } from '../../firebase/firebaseClient';
import {
  MessageReceiver,
  MessageType,
} from '@/utilities/messages/MessagesTypes';
import BackArrow from '../UI/Icons/EventIcons/BackArrow';

interface Props {
  messageRoomId?: string;
  receivingUser: MessageReceiver;
  showMsgContainer: boolean;
  setShowMsgContainer: Dispatch<SetStateAction<boolean>>;
  setMessageRoomId: Dispatch<SetStateAction<string>>;
}

const MobileMessageContainer: FC<Props> = ({
  receivingUser,
  messageRoomId,
  showMsgContainer,
  setShowMsgContainer,
  setMessageRoomId,
}) => {
  const { userData } = useAuth();
  const scrollLast = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [messages, setMessages] = useState<MessageType[]>([]);

  useEffect(() => {
    if (messageRoomId) {
      fetchMessages();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messageRoomId]);

  useEffect(() => {
    scrollLast.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchMessages = () => {
    try {
      db.collection('messageRooms')
        .doc(messageRoomId)
        .collection('messages')
        .orderBy('createdAt', 'asc')
        .onSnapshot((snapshot) => {
          const temp: MessageType[] = [];
          snapshot.forEach((doc) => {
            temp.push({
              ...doc.data(),
              id: doc.id,
            } as MessageType);
          });
          setMessages(temp);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const messagesListView =
    messages &&
    messages.map((message: MessageType) => {
      const isOwnerOfMessage = message.uid === userData.uid;
      return (
        <Message key={message.id} isOwner={isOwnerOfMessage} data={message} />
      );
    });

  const openProfile = () => {
    router.push(`/profile/${receivingUser.username}`);
  };

  if (!showMsgContainer) return null;

  return (
    <div className="fixed h-screen bg-black inset-0 w-full flex flex-col px-3 pt-2 z-50">
      {/**Header */}
      <div
        className="flex gap-6 items-center justify-start px-4 bg-gray-900 
          rounded-t-lg py-2 border-t-2 border-r-2 border-l-2 border-gray-800"
      >
        <BackArrow
          onClick={() => {
            setShowMsgContainer(false);
          }}
          size={24}
        />
        {receivingUser.photoURL ? (
          <div
            onClick={openProfile}
            className="relative h-12 w-12 cursor-pointer"
          >
            <Image
              src={receivingUser.photoURL}
              alt="Picture of a friend"
              layout="fill"
              objectFit="contain"
              className="rounded-full"
            />
          </div>
        ) : null}
        <span onClick={openProfile} className="text-gray-300 cursor-pointer">
          {receivingUser.name}
        </span>
        <span
          onClick={openProfile}
          className="text-xs text-gray-500 cursor-pointer"
        >
          {receivingUser.username}
        </span>
      </div>

      {/** Message View */}
      <div
        className={
          'flex flex-col bg-gray-900 rounded-b-lg h-[75vh] border-2 ' +
          'border-gray-800 overflow-y-scroll px-2'
        }
      >
        {/* {messages} */}
        <div ref={scrollLast}>{messagesListView}</div>
      </div>
      <div className="fixed inset-x-4 bottom-3">
        <MessageInput
          messageRoomId={messageRoomId}
          receivingUser={receivingUser}
          fetchMessages={fetchMessages}
          setMessageRoomId={setMessageRoomId}
        />
      </div>
    </div>
  );
};

export default MobileMessageContainer;
