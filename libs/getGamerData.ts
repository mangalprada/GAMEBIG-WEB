import { firebaseAdmin } from '../firebase/firebaseAdmin';
import { GamerData } from '../utilities/types';

const getGamerData = async (username: string) => {
  const savedGames: Array<GamerData> = [];
  await firebaseAdmin
    .firestore()
    .collection('gamers')
    .where('username', '==', username)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const { ingamename, ingameid, gameCode } = doc.data();
        savedGames.push({ ingamename, ingameid, gameCode, docId: doc.id });
      });
    })
    .catch((error) => {
      console.log('Error getting documents: ', error);
    });
  return savedGames;
};

export default getGamerData;
