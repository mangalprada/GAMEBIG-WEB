import { useEffect, useRef, useState, Dispatch, SetStateAction } from 'react';
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

interface Props {
  messageRoomId?: string;
  receivingUser: MessageReceiver;
  setMessageRoomId: Dispatch<SetStateAction<string>>;
}

export default function MessageContainer({
  receivingUser,
  messageRoomId,
  setMessageRoomId,
}: Props) {
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

  return (
    <div className="h-[100vh] relative w-3/5 flex flex-col px-3">
      {/** Header */}
      <div
        className="flex gap-6 items-center justify-start px-4 bg-gray-900 
          rounded-t-lg py-2 border-t-2 border-r-2 border-l-2 border-gray-800"
      >
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
        <span
          onClick={openProfile}
          className="text-2xl text-gray-300 cursor-pointer hover:text-indigo-600"
        >
          {receivingUser.name}
        </span>
        <span
          onClick={openProfile}
          className="text-lg text-gray-400 cursor-pointer"
        >
          @{receivingUser.username}
        </span>
      </div>

      {/** Message Viewer */}
      <div
        className={
          'flex flex-col bg-gray-900 rounded-b-lg h-4/6 border-2 ' +
          'border-gray-800 overflow-y-scroll px-4'
        }
      >
        {/* {messages} */}
        <div>{messagesListView}</div>
        <div ref={scrollLast} />
      </div>

      {/** Message Input Container */}
      <MessageInput
        messageRoomId={messageRoomId}
        receivingUser={receivingUser}
        fetchMessages={fetchMessages}
        setMessageRoomId={setMessageRoomId}
      />
    </div>
  );
}
