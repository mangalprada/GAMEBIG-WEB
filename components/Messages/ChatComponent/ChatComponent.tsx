import { useEffect, useRef } from 'react';
import { useAuth } from '../../../context/authContext';
import { Chat } from '../../../utilities/contact/contact';
import Message from './../../Contact/Message';

interface Props {
  chatDatas: any | undefined;
}

export default function ChatContainer({ chatDatas }: Props) {
  const scrollLast = useRef<HTMLDivElement>(null);
  const { userData } = useAuth();

  useEffect(() => {
    scrollLast.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatDatas]);

  const messages =
    chatDatas &&
    chatDatas.map((chatData: Chat) => {
      const isOwnerOfMessage = chatData.userId === userData.uid;
      return (
        <Message key={chatData.id} isOwner={isOwnerOfMessage} data={chatData} />
      );
    });

  return (
    <div
      className={
        'flex flex-col bg-gray-900 rounded-md h-full mt-5 border-2 ' +
        'border-gray-800 overflow-y-scroll px-2 md:px-4'
      }
    >
      {messages}
      <div ref={scrollLast}></div>
    </div>
  );
}
