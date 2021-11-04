import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ChatContainer from '../../components/Messages/MessageContainer';
import MessageRoomList from '../../components/Messages/MessageRoomList';
import { MessageReceiver } from '@/utilities/messages/MessagesTypes';

const Messages = () => {
  const router = useRouter();
  const [receiver, setReceiver] = useState<MessageReceiver>(
    {} as MessageReceiver
  );
  const [messageRoomId, setMessageRoomId] = useState<string>('');

  useEffect(() => {
    if (router.query.receiver && typeof router.query.receiver == 'string') {
      const receiver = JSON.parse(router.query.receiver);
      setReceiver(receiver);
    }
  }, [router.query.receiver]);

  return (
    <div className="flex justify-center px-2 py-6">
      <div className="flex w-full md:w-3/4 md:gap-8 h-screen ">
        <MessageRoomList
          setMessageRoomId={setMessageRoomId}
          setReceiver={setReceiver}
        />
        <ChatContainer messageRoomId={messageRoomId} receivingUser={receiver} />
      </div>
    </div>
  );
};

export default Messages;
