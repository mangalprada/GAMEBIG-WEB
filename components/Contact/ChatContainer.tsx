import { useEffect, useRef } from 'react';
import { useAuth } from '../../context/authContext';
import { Chat } from '../../utilities/contact/contact';
import Message from './Message';

interface Props {
  chatDatas: Chat[];
}

export default function ChatContainer({ chatDatas }: Props) {
  const scrollLast = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  useEffect(() => {
    scrollLast.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const messages =
    chatDatas &&
    chatDatas.map((chatData) => {
      const isOwnerOfMessage = chatData.userId === user.uid;
      return (
        <Message key={chatData.id} isOwner={isOwnerOfMessage} data={chatData} />
      );
    });

  return (
    <div className="flex flex-col bg-white rounded-t-md h-96 mx-5 mt-5 overflow-y-scroll md:px-4">
      {messages}
      <div ref={scrollLast}></div>
    </div>
  );
}
