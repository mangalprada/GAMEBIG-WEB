import { db } from '../firebase/config';

export const getOrganizationIdAndName = async (userId: string) => {
  let orgId: string | null = null;
  let orgName: string | null = null;

  const userRef = db.collection('users').doc(userId);
  const doc = await userRef.get();
  if (!doc.exists) {
    console.log('No such document!');
  } else {
    const data = doc.data();
    if (data && data.linkedOrganizationId) {
      orgId = data.linkedOrganizationId;
      orgName = data.linkedOrganizationName;
    }
  }
  return { orgId, orgName };
};
