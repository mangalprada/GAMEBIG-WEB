import { TeamUpSchemaType } from '@/utilities/openings/teamUpTypes';
import { UserData } from '@/utilities/types';
import { db } from 'firebase/firebaseClient';

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
    });
    return true;
  } catch {
    return false;
  }
}

export async function checkIfApplied(
  userId: string,
  docId: string | undefined
) {
  try {
    console.log(userId, docId);

    const userDoc = await db
      .collection('teamOpening')
      .doc(docId)
      .collection('joinees')
      .doc(userId)
      .get();
    if (userDoc.exists) return true;
  } catch (error) {
    console.log(error);
  }
  return false;
}
