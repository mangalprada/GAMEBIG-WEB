import { TeamUpPost } from '@/utilities/openings/TeamUpPost';
import { firebaseAdmin } from 'firebase/firebaseAdmin';

export default async function handler(req: any, res: any) {
  try {
    const joinPosts: TeamUpPost[] = [];
    await firebaseAdmin
      .firestore()
      .collection('teamOpening')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          joinPosts.push({ ...(doc.data() as TeamUpPost), docId: doc.id });
        });
      });

    return res.json({
      joinPosts,
      success: true,
    });
  } catch (error) {
    return res.json({
      message: new Error(error as string).message,
      success: false,
    });
  }
}
