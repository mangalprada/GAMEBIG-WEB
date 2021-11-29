import { TeamType } from '@/utilities/types';
import { db } from 'firebase/firebaseClient';

export const fetchInvitingTeams = async (uid: string) => {
  let teams: TeamType[] = [];
  await db
    .collection('teams')
    .where('invitedUids', 'array-contains', uid)
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
