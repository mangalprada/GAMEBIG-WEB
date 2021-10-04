import firebase, { db } from '../firebase/firebaseClient';
import { Chat, InputChat } from '../utilities/contact/contact';

export const fetchAllChatMessages = async () => {
  let chatDatas = [] as Chat[];
  const chatCollectionRef = db.collection('discussions');
  try {
    const querySnapshot = await chatCollectionRef.get();
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const chatData = {
        id: doc.id,
        createdAt: data.createdAt.toDate().toISOString(),
        userName: data.userName,
        userId: data.userId,
        msg: data.msg,
        subHeader: data.subHeader,
      };
      chatDatas.push(chatData);
    });
  } catch (error) {
    console.log('Error while fetching chatData - ', error);
  }
  return chatDatas;
};

export const postMessage = async (chat: InputChat) => {
  let chatId = null;
  try {
    const docRef = await db.collection('discussions').add({
      ...chat,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    chatId = docRef.id;
  } catch (error) {
    console.log('Error while uploading chat Data - ', error);
  }
  return chatId;
};
