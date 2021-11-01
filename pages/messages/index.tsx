import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ChatContainer from '../../components/Messages/MessageContainer';
import MessageRoomList from '../../components/Messages/MessageRoomList';
import { UserData } from '../../utilities/types';

const Messages = () => {
  const router = useRouter();
  const [receiver, setReceiver] = useState<UserData>();
  const [messageRoomId, setMessageRoomId] = useState<string>('');

  useEffect(() => {
    if (router.query.receiver && typeof router.query.receiver == 'string') {
      const receiver = JSON.parse(router.query.receiver);
      setReceiver(receiver);
    }
  }, [router.query.receiver]);

  return (
    <div className="fixed md:w-10/12">
      <div className="flex items-center mt-4 md:gap-8 h-screen ">
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
