import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import MessageContainer from '../../components/Messages/MessageContainer';
import MessageRoomList from '../../components/Messages/MessageRoomList';
import {
  MessageReceiver,
  MessageRoomType,
} from '@/utilities/messages/MessagesTypes';
import { db } from 'firebase/firebaseClient';
import { useAuth } from '@/context/authContext';
import MobileMessageContainer from '@/components/Messages/MobileMessageContainer';
import { useMessages } from '@/context/messageContext';

const Messages = () => {
  const router = useRouter();
  const { userData } = useAuth();
  const { messageRooms } = useMessages();
  const [receiver, setReceiver] = useState<MessageReceiver>(
    {} as MessageReceiver
  );
  const [messageRoomId, setMessageRoomId] = useState<string>('');
  const [showMsgContainer, setShowMsgContainer] = useState<boolean>(false);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);

  useEffect(() => {
    const getRoomId = async (uid: string) => {
      messageRooms.find((room) => {
        if (room.type === 'direct' && room.receiver[userData.uid].uid === uid) {
          setMessageRoomId(room.docId);
        }
      });
    };
    if (router.query.receiver && typeof router.query.receiver == 'string') {
      const data: MessageReceiver = JSON.parse(router.query.receiver);
      setReceiver(data);
      getRoomId(data.uid);
      setShowMsgContainer(true);
    }
  }, [messageRooms, router.query.receiver, userData.uid]);

  useEffect(() => {
    handleWindowResize();
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
        <div className="w-full mt-4 flex justify-center h-[85vh] fixed md:gap-8">
          <MessageRoomList
            setMessageRoomId={setMessageRoomId}
            setReceiver={setReceiver}
            setShowMsgContainer={setShowMsgContainer}
            showMsgContainer={showMsgContainer}
            isSmallScreen={isSmallScreen}
            messageRooms={messageRooms}
          />
          {isSmallScreen ? null : (
            <MessageContainer
              messageRoomId={messageRoomId}
              setMessageRoomId={setMessageRoomId}
              receivingUser={receiver}
            />
          )}
        </div>
        {isSmallScreen ? (
          <MobileMessageContainer
            messageRoomId={messageRoomId}
            setMessageRoomId={setMessageRoomId}
            receivingUser={receiver}
            setShowMsgContainer={setShowMsgContainer}
            showMsgContainer={showMsgContainer}
          />
        ) : (
          <></>
        )}
      </Aux>
    </div>
  );
};

export default Messages;
