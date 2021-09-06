import { db } from '../firebase/config';

export const getOrganizationId = async (userId: string) => {
  let orgId: string | null = null;

  const userRef = db.collection('users').doc(userId);
  const doc = await userRef.get();
  if (!doc.exists) {
    console.log('No such document!');
  } else {
    const data = await doc.data();
    if (data && data.linkedOrganizationId) {
      orgId = data.linkedOrganizationId;
    }
  }
  return orgId;
};
