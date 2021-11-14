import firebase, { db } from '../firebase/firebaseClient';
import { EventFormData } from '../utilities/eventItem/types';

export const addNewEvent = async (
  pageId: string,
  pageName: string | null,
  data: EventFormData
) => {
  let eventId = null;
  try {
    const eventRef = await db.collection('events').add({
      ...data,
      linkedPageId: pageId,
      linkedPageName: pageName,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    eventId = eventRef.id;
  } catch (err) {
    console.log('Error adding new Event', err);
  }
  return eventId;
};
