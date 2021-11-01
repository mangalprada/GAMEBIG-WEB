import { useState } from 'react';
import { useAuth } from '../../context/authContext';
import firebase, { db } from '../../firebase/firebaseClient';

export default function MessageInput({
  receivingUser,
  messageRoomId,
  fetchMessages,
}: {
  receivingUser: any;
  messageRoomId?: string;
  fetchMessages: () => void;
}) {
  const [message, setMessage] = useState<string>('');
  const { userData } = useAuth();

  const createMessageRoom = async () => {
    let roomId = '';
    console.log(userData, receivingUser);
    await db
      .collection('messageRooms')
      .add({
        usernames: [userData.username, receivingUser.username],
        userDetails: {
          [receivingUser.username]: {
            username: userData.username,
            photoURL: userData.photoURL,
            name: userData.name,
          },
          [userData.username]: {
            username: receivingUser.username,
            photoURL: receivingUser.photoURL,
            name: receivingUser.name,
          },
        },
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        lastMessage: message,
      })
      .then(function (docRef) {
        roomId = docRef.id;
      })
      .catch(function (error) {
        console.error('Error adding document: ', error);
      });
    return roomId;
  };

  const updateMessageRoom = async ({
    roomId,
    message,
  }: {
    roomId: string;
    message: string;
  }) => {
    await db
      .collection('messageRooms')
      .doc(roomId)
      .set({
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        lastMessage: message,
        noOfUnseenMessages: 0, // increment
      })
      .catch(function (error) {
        console.error('Error adding document: ', error);
      });
  };

  const sendMessage = async () => {
    if (message === '') return;

    let roomId;
    if (!messageRoomId) {
      roomId = await createMessageRoom();
    } else {
      roomId = messageRoomId;
    }
    db.collection('messageRooms').doc(roomId).collection('messages').add({
      username: userData.username,
      message: message,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    if (messageRoomId) {
      updateMessageRoom({ roomId, message });
    }
    fetchMessages();
  };

  return (
    <form
      className="w-full pb-3 flex items-center justify-between pt-4"
      onSubmit={(e) => {
        e.preventDefault();
        sendMessage();
      }}
    >
      <input
        aria-placeholder="Type Here"
        placeholder="Type Here..."
        className={
          'py-3 mx-3 pl-5 block w-full rounded-lg bg-gray-700 ' +
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
