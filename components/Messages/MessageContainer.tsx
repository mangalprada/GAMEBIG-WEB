import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { games } from '../../utilities/GameList';
import { useAuth } from '../../context/authContext';
import Message from './Message';
import MessageInput from './MessageInput';
import { db } from '../../firebase/firebaseClient';

interface Props {
  messageRoomId?: string;
  receivingUser: any;
}

export default function ChatContainer({ receivingUser, messageRoomId }: Props) {
  const { userData } = useAuth();
  const scrollLast = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [messages, setMessages] = useState<any>([]);

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
    db.collection('messageRooms')
      .doc(messageRoomId)
      .collection('messages')
      .orderBy('createdAt', 'asc')
      .onSnapshot((snapshot) => {
        const temp: any = [];
        snapshot.forEach((doc) => {
          console.log(doc.data());
          temp.push({
            ...doc.data(),
            id: doc.id,
          });
        });
        setMessages(temp);
      });
  };

  const messagesListView =
    messages &&
    messages.map((message: any) => {
      const isOwnerOfMessage = message.username === userData.username;
      return (
        <Message key={message.id} isOwner={isOwnerOfMessage} data={message} />
      );
    });

  const openProfile = () => {
    router.push(`/profile/${receivingUser.username}`);
  };

  if (!receivingUser)
    return (
      <div className="text-right font-sans font-bold text-3xl text-indigo-600">
        Chat with your fellow gaming Warriors!
      </div>
    );

  return (
    <div className="h-screen w-3/5 hidden md:flex flex-col">
      <div className="flex gap-6 items-center justify-start px-4 bg-gray-900 rounded-t-lg py-2 border-t-2 border-r-2 border-l-2 border-gray-800">
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
          className="text-2xl text-gray-300 cursor-pointer"
        >
          {receivingUser.name}
        </span>
        <span
          onClick={openProfile}
          className="text-xl text-gray-300 cursor-pointer"
        >
          {receivingUser.username}
        </span>
      </div>
      <div
        className={
          'flex flex-col bg-gray-900 rounded-b-lg h-4/6 border-2 ' +
          'border-gray-800 overflow-y-scroll px-2 md:px-4'
        }
      >
        {/* {messages} */}
        <div ref={scrollLast}>{messagesListView}</div>
      </div>
      <MessageInput
        messageRoomId={messageRoomId}
        receivingUser={receivingUser}
        fetchMessages={fetchMessages}
      />
    </div>
  );
}
