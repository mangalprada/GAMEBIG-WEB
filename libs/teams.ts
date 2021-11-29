import { db } from 'firebase/firebaseClient';

type props = { teamId: string; team: any };

export const updateTeam = async ({ teamId, team }: props) => {
  await db.collection('teams').doc(teamId).update(team);
};
