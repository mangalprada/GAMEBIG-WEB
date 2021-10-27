import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { games } from '../../utilities/GameList';
import { useAuth } from '../../context/authContext';
import { Chat } from '../../utilities/contact/contact';
import Message from './Message';
import TypeContainer from './ReplyContainer';

interface Props {
  chatDatas: any | undefined;
}

export default function ChatContainer({ chatDatas }: Props) {
  const scrollLast = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  useEffect(() => {
    scrollLast.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatDatas]);

  const messages =
    chatDatas &&
    chatDatas.map((chatData: Chat) => {
      const isOwnerOfMessage = chatData.userId === user.uid;
      return (
        <Message key={chatData.id} isOwner={isOwnerOfMessage} data={chatData} />
      );
    });

  return (
    <div className="h-screen w-3/5 hidden md:flex flex-col">
      <div className="flex gap-6 items-center justify-start px-4 bg-gray-900 rounded-t-lg py-2 border-t-2 border-r-2 border-l-2 border-gray-800">
        <div className="relative h-12 w-12 ">
          <Image
            src={games['bgmi-m'].imageSource}
            alt="Picture of a friend"
            layout="fill"
            objectFit="contain"
            className="rounded-full"
          />
        </div>
        <span className="text-2xl text-gray-300">Mark Zuckerberg</span>
      </div>
      <div
        className={
          'flex flex-col bg-gray-900 rounded-b-lg h-4/6 border-2 ' +
          'border-gray-800 overflow-y-scroll px-2 md:px-4'
        }
      >
        {messages}
        <div ref={scrollLast}></div>
      </div>
      <TypeContainer />
    </div>
  );
}
