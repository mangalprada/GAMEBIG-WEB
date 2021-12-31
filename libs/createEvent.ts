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
    });
    eventId = eventRef.id;
  } catch (err) {
    console.log('Error adding new Event', err);
  }
  return eventId;
};

export const updateEvent = async (eventId: string, data: any) => {
  try {
    await db.collection('events').doc(eventId).update(data);
  } catch (err) {
    console.log('Error adding new Event', err);
  }
};
