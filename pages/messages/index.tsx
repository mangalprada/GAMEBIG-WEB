import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import MessageContainer from '../../components/Messages/MessageContainer';
import MessageRoomList from '../../components/Messages/MessageRoomList';
import { MessageReceiver } from '@/utilities/messages/MessagesTypes';

const Messages = () => {
  const router = useRouter();
  const [receiver, setReceiver] = useState<MessageReceiver>(
    {} as MessageReceiver
  );
  const [messageRoomId, setMessageRoomId] = useState<string>('');
  const [showMsgContainer, setShowMsgContainer] = useState<boolean>(false);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);

  useEffect(() => {
    if (router.query.receiver && typeof router.query.receiver == 'string') {
      const receiver = JSON.parse(router.query.receiver);
      setReceiver(receiver);
    }
  }, [router.query.receiver]);

  useEffect(() => {
    handleWindowResize();
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  const handleWindowResize = () => {
    if (window.innerWidth < 768) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };

  return (
    <div>
      <Head>
        <title>Messages</title>
        <meta name="description" content="Send and receive messages" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <Aux>
        <div className="w-full mt-4 flex justify-center">
          <div className="flex justify-center w-full md:w-3/4 md:gap-8 h-screen">
            <MessageRoomList
              setMessageRoomId={setMessageRoomId}
              setReceiver={setReceiver}
              setShowMsgContainer={setShowMsgContainer}
              showMsgContainer={showMsgContainer}
              isSmallScreen={isSmallScreen}
            />
            <MessageContainer
              messageRoomId={messageRoomId}
              receivingUser={receiver}
              setShowMsgContainer={setShowMsgContainer}
              showMsgContainer={showMsgContainer}
              isSmallScreen={isSmallScreen}
            />
          </div>
        </div>
      </Aux>
    </div>
  );
};

export default Messages;
