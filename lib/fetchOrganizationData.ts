import { db } from '../firebase/firebaseClient';
import { OrgFormData } from '../utilities/organization/types';

export const fetchOrganizationData = async (orgId: string) => {
  let organizationData: OrgFormData | undefined = undefined;
  const organizationRef = db.collection('organizations').doc(orgId);
  try {
    const orgDoc = await organizationRef.get();
    if (orgDoc.exists) {
      const data = orgDoc.data();
      if (data) {
        organizationData = {
          id: orgId,
          name: data.name,
          about: data.about,
          location: data.location,
          email: data.email,
          phone: data.phone,
          website: data.website,
          youtube: data.youtube,
          discord: data.discord,
          twitch: data.twitch,
          facebook: data.facebook,
          instagram: data.instagram,
          twitter: data.twitter,
          reddit: data.reddit,
        };
      }
    }
  } catch (err) {
    console.log('Error getting Organization data', err);
  }

  return organizationData;
};
