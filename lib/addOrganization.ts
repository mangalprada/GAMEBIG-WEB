import { db } from '../firebase/config';
import { OrgFormData } from '../utilities/organization/types';

export const addOrganization = async (data: OrgFormData) => {
  let orgId = null;
  try {
    const docRef = await db.collection('organizations').add(data);
    orgId = await docRef.id;
  } catch (err) {
    console.log(err);
    orgId = null;
  }
  return orgId;
};

export const addOrganizationIdtoAdminUser = async (
  username: string,
  orgId: string
) => {
  await db
    .collection('users')
    .doc(username)
    .update({ linkedOrganizationId: orgId });
};
