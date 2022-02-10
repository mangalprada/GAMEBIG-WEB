import { PageFormData } from '@/utilities/page/types';
import { firebaseAdmin } from 'firebase/firebaseAdmin';

export default async function handler(req: any, res: any) {
  try {
    let pages: PageFormData[] = [];
    await firebaseAdmin
      .firestore()
      .collection('pages')
      .limit(36)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data) {
            pages.push({
              ...data,
              id: doc.id,
            } as PageFormData);
          }
        });
      });

    return res.json({
      data: pages,
      success: true,
    });
  } catch (error) {
    return res.json({
      data: new Error(error as string).message,
      success: false,
    });
  }
}
