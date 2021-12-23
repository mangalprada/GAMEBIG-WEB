import React, { useEffect, useState, createContext, useContext } from 'react';
import { db } from '../firebase/firebaseClient';
import { useAuth } from './authContext';
import { MessageRoomType } from '@/utilities/messages/MessagesTypes';

const messageContext = createContext({
  messageRooms: [] as MessageRoomType[],
  unseen: 0,
  currentMessageRoom: {} as MessageRoomType,
  updateCurrentMessageRoom: (mr: MessageRoomType) => {},
});

function useProviderMessages() {
  const { userData } = useAuth();
  const [messageRooms, setMessageRooms] = useState<MessageRoomType[]>([]);
  const [unseen, setUnseen] = useState<number>(0);
  const [currentMessageRoom, setCurrentMessageRoom] = useState<MessageRoomType>(
    {} as MessageRoomType
  );

  useEffect(() => {
    if (userData.uid) {
      try {
        db.collection('messageRooms')
          .where('uids', 'array-contains', userData.uid)
          .orderBy('updatedAt', 'desc')
          .onSnapshot((snapshot) => {
            let tempUnseen = 0;
            const tempMessageRooms: MessageRoomType[] = [];
            snapshot.docs.map((doc) => {
              const messageRoom = doc.data() as MessageRoomType;
              const { unseen } = messageRoom;
              let currentRoomUnseen = 0;
              if (unseen && unseen[userData.uid]) {
                currentRoomUnseen = unseen[userData.uid];
                tempUnseen += currentRoomUnseen;
              }
              tempMessageRooms.push({
                ...messageRoom,
                docId: doc.id,
                unseen,
                noOfUnseen: currentRoomUnseen,
              });
            });
            setMessageRooms(tempMessageRooms);
            setUnseen(tempUnseen);
          });
      } catch (err) {
        console.log(err);
      }
    }
  }, [userData.uid]);
  const updateCurrentMessageRoom = (mr: MessageRoomType) => {
    setCurrentMessageRoom(mr);
  };
  return { messageRooms, unseen, currentMessageRoom, updateCurrentMessageRoom };
}

type Props = {
  children: React.ReactNode;
};

export const MessagesProvider = ({ children }: Props) => {
  const provider = useProviderMessages();
  return (
    <messageContext.Provider value={provider}>
      {children}
    </messageContext.Provider>
  );
};

export const useMessages = () => {
  return useContext(messageContext);
};
