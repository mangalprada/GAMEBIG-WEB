import { TeamUpSchemaType } from '@/utilities/openings/teamUpTypes';
import { UserData } from '@/utilities/types';
import firebase, { db } from 'firebase/firebaseClient';

export async function createNewPost(
  post: TeamUpSchemaType,
  userData: UserData
) {
  const joinCollectionRef = db.collection('teamOpening');
  try {
    await joinCollectionRef.add({
      ...post,
      username: userData.username,
      photoURL: userData.photoURL,
      name: userData.name,
      uid: userData.uid,
      noOfJoinees: 0,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    return true;
  } catch {
    return false;
  }
}
