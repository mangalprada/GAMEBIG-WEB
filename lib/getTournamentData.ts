import { db } from '../firebase/firebaseClient';
import { TournamentData } from '../utilities/tournament/types';

export const fetchTournamentDataById = async (id: string) => {
  let tournamentData = {} as TournamentData;

  const tournamentRef = db.collection('tournaments').doc(id);
  try {
    const tournamentDoc = await tournamentRef.get();
    if (tournamentDoc.exists) {
      const data = tournamentDoc.data();

      if (data) {
        tournamentData = {
          id: tournamentDoc.id,
          gameCode: data.gameCode,
          mode: data.mode,
          type: data.type,
          tier: data.tier,
          noOfSlots: data.noOfSlots,
          startTime: data.startTime.toDate().toISOString(),
          description: data.description,
          prize: data.prize,
          createdAt: data.createdAt.toDate().toISOString(),
          linkedOrgId: data.linkedOrgId,
          linkedOrgName: data.linkedOrgName,
        };
      }
    }
  } catch (error) {
    console.log('Error fetching tournament data by tournament Id', error);
  }
  return tournamentData;
};

export const fetchParticipatedTeams = async (tournamentId: string) => {
  let participants = [] as Record<string, any>[];
  const participatedTeamsRef = db
    .collection('tournaments')
    .doc(tournamentId)
    .collection('teams');
  try {
    const docSnapshots = await participatedTeamsRef.get();
    docSnapshots.forEach((doc) => {
      if (doc.exists) {
        const data = doc.data();
        if (data)
          participants.push({
            players: data.usernames,
            leader: data.inGameLead,
            teamName: data.teamName,
          });
      }
    });
  } catch (error) {
    console.log('Error fetching participated Teams', error);
  }

  return participants;
};
