import { TeamType } from '@/utilities/types';
import { db } from '../firebase/firebaseClient';
import { EventData } from '../utilities/eventItem/types';

export const fetchEventDataById = async (id: string) => {
  let eventData = {} as EventData;

  const eventRef = db.collection('events').doc(id);
  try {
    const eventDoc = await eventRef.get();
    if (eventDoc.exists) {
      const data = eventDoc.data();

      if (data) {
        eventData = {
          id: eventDoc.id,
          gameCode: data.gameCode,
          mode: data.mode,
          type: data.type,
          tier: data.tier,
          noOfSlots: data.noOfSlots,
          startTime: data.startTime.toDate().toISOString(),
          description: data.description,
          prize: data.prize,
          createdAt: data.createdAt.toDate().toISOString(),
          linkedPageId: data.linkedPageId,
          linkedPageName: data.linkedPageName,
          roomId: data.roomId ? data.roomId : '',
          password: data.password ? data.password : '',
        };
      }
    }
  } catch (error) {
    console.log('Error fetching eventItem data by eventItem Id', error);
  }
  return eventData;
};

export const fetchParticipatedTeams = async (eventId: string) => {
  let participants: TeamType[] = [];
  const participatedTeamsRef = db
    .collection('events')
    .doc(eventId)
    .collection('teams');
  try {
    const docSnapshots = await participatedTeamsRef.get();
    docSnapshots.forEach((doc) => {
      if (doc.exists) {
        const data = doc.data();
        if (data)
          participants.push({
            gamers: data.gamers,
            uids: data.uids,
            inGameLead: data.inGameLead,
            teamName: data.teamName,
            docId: doc.id,
          });
      }
    });
  } catch (error) {
    console.log('Error fetching participated Teams', error);
  }

  return participants;
};
