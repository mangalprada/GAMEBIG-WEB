import { TeamType } from '@/utilities/types';
import { db } from 'firebase/firebaseClient';

export const fetchTeams = async (uid: string) => {
  const teams: TeamType[] = [];
  db.collection('teams')
    .where('uids', 'array-contains', uid)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data() as TeamType;
        teams.push({ ...data, docId: doc.id });
      });
    })
    .catch((error) => {
      console.log('Error getting documents: ', error);
    });
  return teams;
};
