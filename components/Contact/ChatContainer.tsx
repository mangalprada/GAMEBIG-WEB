import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { games } from '../../utilities/GameList';
import { useAuth } from '../../context/authContext';
import { Chat } from '../../utilities/contact/contact';
import Message from './Message';
import MessageInput from './MessageInput';
import { db } from '../../firebase/firebaseClient';

interface Props {
  receivingUser: any;
}

export default function ChatContainer({ receivingUser }: Props) {
  const scrollLast = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  // useEffect(() => {
  //   db.collection('messages')
  //     .where('usernames', 'array-contains', [
  //       user.username,
  //       receivingUser.username,
  //     ])
  //     .get();
  // });

  // useEffect(() => {
  //   scrollLast.current?.scrollIntoView({ behavior: 'smooth' });
  // }, [chatData]);

  // const messages =
  //   chatData &&
  //   chatData.map((chatData: Chat) => {
  //     const isOwnerOfMessage = chatData.userId === user.uid;
  //     return (
  //       <Message key={chatData.id} isOwner={isOwnerOfMessage} data={chatData} />
  //     );
  //   });

  if (!receivingUser) return null;

  return (
    <div className="h-screen w-3/5 hidden md:flex flex-col">
      <div className="flex gap-6 items-center justify-start px-4 bg-gray-900 rounded-t-lg py-2 border-t-2 border-r-2 border-l-2 border-gray-800">
        {receivingUser.photoURL ? (
          <div className="relative h-12 w-12 ">
            <Image
              src={receivingUser.photoURL}
              alt="Picture of a friend"
              layout="fill"
              objectFit="contain"
              className="rounded-full"
            />
          </div>
        ) : null}
        <span className="text-2xl text-gray-300">{receivingUser.name}</span>
        <span className="text-xl text-gray-300">{receivingUser.username}</span>
      </div>
      <div
        className={
          'flex flex-col bg-gray-900 rounded-b-lg h-4/6 border-2 ' +
          'border-gray-800 overflow-y-scroll px-2 md:px-4'
        }
      >
        {/* {messages} */}
        <div ref={scrollLast}></div>
      </div>
      <MessageInput receiverUsername={receivingUser.username as string} />
    </div>
  );
}
