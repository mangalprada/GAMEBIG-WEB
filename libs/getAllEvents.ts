import { firebaseAdmin } from '../firebase/firebaseAdmin';
import { EventData } from '../utilities/eventItem/types';

export const fetchAllEventData = async () => {
  let eventDatas = [] as EventData[];
  const eventRef = firebaseAdmin
    .firestore()
    .collection('events')
    .where('startTime', '>=', new Date())
    .orderBy('startTime', 'asc');
  try {
    const querySnapshot = await eventRef.get();
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const eventData = {
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
        linkedPageId: data.linkedPageId,
        linkedPageName: data.linkedPageName,
        roomId: data.roomId ? data.roomId : '',
        password: data.password ? data.password : '',
      };
      eventDatas.push(eventData);
    });
  } catch (err) {
    console.log('Error fetching Event Ids', err);
  }
  return eventDatas;
};

export const fetchEventsDataByPageId = async (pageId: string) => {
  let eventDatas = [] as EventData[];
  const eventRef = firebaseAdmin.firestore().collection('events');
  const query = eventRef.where('linkedPageId', '==', pageId);
  try {
    const querySnapshot = await query.get();
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const eventData = {
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
        linkedPageId: data.linkedPageId,
        linkedPageName: data.linkedPageName,
      };
      eventDatas.push(eventData);
    });
  } catch (err) {
    console.log('Error fetching Event Ids', err);
  }
  return eventDatas;
};

export const fetchEventsDataByUsername = async (username: string) => {
  let eventDatas = [] as EventData[];
  const eventRef = firebaseAdmin.firestore().collection('events');
  const query = eventRef.where('gamerUsernames', 'array-contains', username);
  try {
    const querySnapshot = await query.get();
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const eventData = {
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
        linkedPageId: data.linkedPageId,
        linkedPageName: data.linkedPageName,
      };
      eventDatas.push(eventData);
    });
  } catch (err) {
    console.log('Error fetching Event Ids', err);
  }
  return eventDatas;
};
