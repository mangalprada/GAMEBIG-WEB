import firebase, { db } from '../firebase/firebaseClient';
import { EventFormData } from '../utilities/eventItem/types';

export const addNewEvent = async (
  orgId: string,
  orgName: string | null,
  data: EventFormData
) => {
  let eventId = null;
  try {
    const eventRef = await db.collection('events').add({
      ...data,
      linkedOrgId: orgId,
      linkedOrgName: orgName,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    eventId = eventRef.id;
  } catch (err) {
    console.log('Error adding new Event', err);
  }
  return eventId;
};
