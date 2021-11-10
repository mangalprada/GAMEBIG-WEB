import { db } from 'firebase/firebaseClient';
import { GamerData } from '../utilities/types';

export const getGamerData = async (username: string) => {
  const savedGames: Record<string, GamerData> = {};
  try {
    await db
      .collection('gamers')
      .where('username', '==', username)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const datFetched = doc.data();
          savedGames[datFetched.gameCode] = {
            inGameName: datFetched.inGameName ? datFetched.inGameName : '',
            inGameId: datFetched.inGameId ? datFetched.inGameId : '',
            gameCode: datFetched.gameCode ? datFetched.gameCode : '',
            docId: doc.id,
            kd: datFetched.kd ? datFetched.kd : '',
            highestTier: datFetched.highestTier ? datFetched.highestTier : '',
            damage: datFetched.damage ? datFetched.damage : '',
            kills: datFetched.kills ? datFetched.kills : '',
            about: datFetched.about ? datFetched.about : '',
            username: datFetched.username ? datFetched.username : '',
            uid: datFetched.uid ? datFetched.uid : '',
          };
        });
      });
  } catch (error) {
    console.log('Error getting documents: ', error);
  }
  return savedGames;
};

export const saveGamerData = async (
  gamerData: GamerData,
  username: string,
  gameCode: string
) => {
  try {
    if (gamerData.docId) {
      await db.collection('gamers').doc(gamerData.docId).set(gamerData);
    } else {
      await db.collection('gamers').add({ ...gamerData, username, gameCode });
    }
  } catch (error) {
    console.log('Error saving gamer data: ', error);
  }
};
