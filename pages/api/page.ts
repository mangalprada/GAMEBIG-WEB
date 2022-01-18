import { PageFormData } from '@/utilities/page/types';
import { firebaseAdmin } from 'firebase/firebaseAdmin';

export default async function handler(req: any, res: any) {
  const { pageId } = req.query;
  try {
    let pageData: PageFormData | undefined = undefined;
    const pageRef = firebaseAdmin.firestore().collection('pages').doc(pageId);

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
    return res.json({
      pageData,
      success: true,
    });
  } catch (error) {
    return res.json({
      message: new Error(error as string).message,
      success: false,
    });
  }
}
