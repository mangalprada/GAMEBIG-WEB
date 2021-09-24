import firebase, { db } from '../firebase/firebaseClient';
import { TournamentFormData } from '../utilities/tournament/types';

export const addNewTournament = async (
  orgId: string,
  orgName: string | null,
  data: TournamentFormData
) => {
  let tournamentId = null;
  try {
    const tournamentRef = await db.collection('tournaments').add({
      ...data,
      linkedOrgId: orgId,
      linkedOrgName: orgName,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    tournamentId = tournamentRef.id;
  } catch (err) {
    console.log('Error adding new Tournament', err);
  }
  return tournamentId;
};
