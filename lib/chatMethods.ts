import firebase, { db } from '../firebase/firebaseClient';
import { InputChat } from '../utilities/contact/contact';

export const postMessage = async (chat: InputChat) => {
  let chatId = null;
  try {
    const docRef = await db.collection('messages').add({
      ...chat,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    chatId = docRef.id;
  } catch (error) {
    console.log('Error while uploading chat Data - ', error);
  }
  return chatId;
};
