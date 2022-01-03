import { db } from '../firebase/firebaseClient';
import { PageFormData } from '../utilities/page/types';

export const fetchPageData = async (pageId: string) => {
  let pageData: PageFormData | undefined = undefined;
  const pageRef = db.collection('pages').doc(pageId);
  try {
    const pageDoc = await pageRef.get();
    if (pageDoc.exists) {
      const data = pageDoc.data();
      if (data) {
        pageData = {
          id: pageId,
          admins: data.admins,
          name: data.name,
          category: data.category,
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
    console.log('Error getting Page data', err);
  }

  return pageData;
};
