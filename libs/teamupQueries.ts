import { TeamUpSchemaType } from '@/utilities/join/teamUpTypes';
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
