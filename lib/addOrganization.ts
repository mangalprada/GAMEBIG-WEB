import { db } from '../firebase/firebaseClient';
import { OrgFormData } from '../utilities/organization/types';

export const addOrganization = async (data: OrgFormData) => {
  let orgId = null;
  try {
    const docRef = await db.collection('organizations').add(data);
    orgId = docRef.id;
  } catch (err) {
    console.log(err);
    orgId = null;
  }
  return orgId;
};

export const addOrganizationIdtoAdminUser = async (
  docId: string | undefined,
  orgName: string,
  orgId: string
) => {
  await db
    .collection('users')
    .doc(docId)
    .update({ linkedOrganizationId: orgId, linkedOrganizationName: orgName });
};
