import { useState } from 'react';
import ChatContainer from '../../components/Contact/ChatContainer';
import MessageRoomList from '../../components/Messages/MessageRoomsList/MessageRoomList';

const Messages = () => {
  const [receiver, setReceiver] = useState<string>();

  return (
    <div className="fixed md:w-10/12">
      <div className="flex items-center mt-4 md:gap-8 h-screen ">
        <MessageRoomList setReceiver={setReceiver} />
        <ChatContainer receivingUser={receiver} />
      </div>
    </div>
  );
};

export default Messages;
