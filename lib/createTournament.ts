import firebase, { db } from '../firebase/config';
import { TournamentData } from '../utilities/tournament/types';

export const addNewTournament = async (orgId: string, data: TournamentData) => {
  let tournamentId = null;
  try {
    const tournamentRef = await db.collection('tournaments').add({
      ...data,
      linkedOrgId: orgId,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    tournamentId = tournamentRef.id;
  } catch (err) {
    console.log('Error adding new Tournament', err);
  }
  return tournamentId;
};
