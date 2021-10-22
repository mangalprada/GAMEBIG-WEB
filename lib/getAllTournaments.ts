import { firebaseAdmin } from '../firebase/firebaseAdmin';
import { TournamentData } from '../utilities/tournament/types';

export const fetchAllTournamentData = async () => {
  let tournamentDatas = [] as TournamentData[];
  const tournamentRef = firebaseAdmin.firestore().collection('tournaments');
  try {
    const querySnapshot = await tournamentRef.get();
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const tournamentData = {
        id: doc.id,
        gameCode: data.gameCode,
        mode: data.mode,
        type: data.type,
        tier: data.tier,
        noOfSlots: data.noOfSlots,
        description: data.description,
        prize: data.prize,
        startTime: data.startTime.toDate().toISOString(),
        createdAt: data.createdAt.toDate().toISOString(),
        linkedOrgId: data.linkedOrgId,
        linkedOrgName: data.linkedOrgName,
        roomId: data.roomId ? data.roomId : '',
        password: data.password ? data.password : '',
      };
      tournamentDatas.push(tournamentData);
    });
  } catch (err) {
    console.log('Error fetching tournament Ids', err);
  }
  return tournamentDatas;
};

export const fetchTournamentsDataByOrgId = async (orgId: string) => {
  let tournamentDatas = [] as TournamentData[];
  const tournamentRef = firebaseAdmin.firestore().collection('tournaments');
  const query = tournamentRef.where('linkedOrgId', '==', orgId);
  try {
    const querySnapshot = await query.get();
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const tournamentData = {
        id: doc.id,
        gameCode: data.gameCode,
        mode: data.mode,
        type: data.type,
        tier: data.tier,
        noOfSlots: data.noOfSlots,
        description: data.description,
        prize: data.prize,
        startTime: data.startTime.toDate().toISOString(),
        createdAt: data.createdAt.toDate().toISOString(),
        linkedOrgId: data.linkedOrgId,
        linkedOrgName: data.linkedOrgName,
      };
      tournamentDatas.push(tournamentData);
    });
  } catch (err) {
    console.log('Error fetching tournament Ids', err);
  }
  return tournamentDatas;
};

export const fetchTournamentsDataByUsername = async (username: string) => {
  let tournamentDatas = [] as TournamentData[];
  const tournamentRef = firebaseAdmin.firestore().collection('tournaments');
  const query = tournamentRef.where(
    'gamerUsernames',
    'array-contains',
    username
  );
  try {
    const querySnapshot = await query.get();
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const tournamentData = {
        id: doc.id,
        gameCode: data.gameCode,
        mode: data.mode,
        type: data.type,
        tier: data.tier,
        noOfSlots: data.noOfSlots,
        description: data.description,
        prize: data.prize,
        startTime: data.startTime.toDate().toISOString(),
        createdAt: data.createdAt.toDate().toISOString(),
        linkedOrgId: data.linkedOrgId,
        linkedOrgName: data.linkedOrgName,
      };
      tournamentDatas.push(tournamentData);
    });
  } catch (err) {
    console.log('Error fetching tournament Ids', err);
  }
  return tournamentDatas;
};
