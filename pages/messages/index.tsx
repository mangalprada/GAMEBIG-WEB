import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import MessageContainer from '../../components/Messages/MessageContainer';
import MessageRoomList from '../../components/Messages/MessageRoomList';
import { MessageReceiver } from '@/utilities/messages/MessagesTypes';
import { db } from 'firebase/firebaseClient';
import { useAuth } from '@/context/authContext';

const Messages = () => {
  const router = useRouter();
  const { userData } = useAuth();
  const [receiver, setReceiver] = useState<MessageReceiver>(
    {} as MessageReceiver
  );
  const [messageRoomId, setMessageRoomId] = useState<string>('');
  const [showMsgContainer, setShowMsgContainer] = useState<boolean>(false);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);

  useEffect(() => {
    if (router.query.receiver && typeof router.query.receiver == 'string') {
      const data: MessageReceiver = JSON.parse(router.query.receiver);
      setReceiver(data);
      getMessageRoomId(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const getMessageRoomId = async (receiverdata: MessageReceiver) => {
    if (!receiverdata.username) return;
    try {
      let roomId = '';
      const querySnapshot = await db
        .collection('messageRooms')
        .where('uids', 'array-contains-any', [receiverdata.uid])
        .get();
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (
          data.type === 'direct' &&
          data.usernames.includes(userData.username)
        ) {
          roomId = doc.id;
        }
      });
      setMessageRoomId(roomId);
    } catch (e) {
      console.log(e);
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
        <div className="w-full mt-4 flex justify-center fixed">
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
              setMessageRoomId={setMessageRoomId}
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
