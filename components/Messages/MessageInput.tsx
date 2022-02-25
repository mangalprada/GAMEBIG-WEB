import { useMessages } from '@/context/messageContext';
import { useState } from 'react';
import { useAuth } from '../../context/authContext';
import firebase, { db } from '../../firebase/firebaseClient';
import axios from 'axios';

const { BASE_URL } = process.env;

type Props = {
  receivingUser: {
    uid: string;
    username: string;
    name: string;
    photoURL: string;
  };
  messageRoomId?: string;
  fetchMessages: () => void;
  setMessageRoomId: (val: string) => void;
};

export default function MessageInput({
  receivingUser,
  messageRoomId,
  fetchMessages,
  setMessageRoomId,
}: Props) {
  const [message, setMessage] = useState<string>('');
  const { userData } = useAuth();
  const { currentMessageRoom } = useMessages();

  const createMessageRoom = async () => {
    let roomId;
    try {
      await db
        .collection('messageRooms')
        .add({
          uids: [userData.uid, receivingUser.uid],
          receiver: {
            [receivingUser.uid]: {
              uid: userData.uid,
              username: userData.username,
              name: userData.name,
              photoURL: userData.photoURL,
            },
            [userData.uid]: receivingUser,
          },
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
          lastMessage: message,
          unseen: {
            [receivingUser.uid]: 0,
            [userData.uid]: 0,
          },
          type: 'direct',
        })
        .then((docRef) => {
          roomId = docRef.id;
        });
    } catch (error) {
      console.log(error);
    }
    return roomId;
  };

  const updateMessageRoom = async ({
    roomId,
    message,
  }: {
    roomId: string;
    message: string;
  }) => {
    try {
      await db
        .collection('messageRooms')
        .doc(roomId)
        .update({
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
          lastMessage: message,
          unseen: {
            [receivingUser.uid]: currentMessageRoom.unseen[receivingUser.uid]
              ? currentMessageRoom.unseen[receivingUser.uid] + 1
              : 1,
            [userData.uid]: 0,
          },
        });
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = async () => {
    if (message.trim() === '') return;

    let roomId;
    if (!messageRoomId) {
      roomId = await createMessageRoom();
    } else {
      roomId = messageRoomId;
    }
    try {
      db.collection('messageRooms').doc(roomId).collection('messages').add({
        uid: userData.uid,
        username: userData.username,
        message: message,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setMessage('');
      await axios.put(`${BASE_URL}/api/sendNotification`, {
        targetUid: receivingUser.uid,
        notificationBody: message,
        notificationTitle: userData.name,
      });
    } catch (e) {
      console.log(e);
    }
    if (roomId) {
      setMessageRoomId(roomId);
      updateMessageRoom({ roomId, message });
    }
    fetchMessages();
  };

  return (
    <form
      className="w-full flex items-center justify-between mt-2"
      onSubmit={(e) => {
        e.preventDefault();
        sendMessage();
      }}
    >
      <input
        aria-placeholder="Type Here"
        placeholder="Type Here..."
        className={
          'py-3 mr-3 pl-5 block w-full rounded-lg bg-gray-700 ' +
          'outline-none font-semibold font-sans focus:text-gray-200 tracking-wide'
        }
        type="text"
        name="message"
        required
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />

      <button
        onClick={(e) => {
          e.preventDefault();
          sendMessage();
        }}
        className="outline-none focus:outline-none"
        type="submit"
      >
        <svg
          className="fill-current text-indigo-600 transform rotate-90"
          height={46}
          width={48}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 
            15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"
          />
        </svg>
      </button>
    </form>
  );
}
