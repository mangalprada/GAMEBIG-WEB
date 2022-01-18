import { UserData } from '@/utilities/types';
import { firebaseAdmin } from 'firebase/firebaseAdmin';

export default async function handler(req: any, res: any) {
  const { username } = req.query;
  const user: UserData[] = [];
  try {
    await firebaseAdmin
      .firestore()
      .collection('users')
      .where('username', '==', username)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data) {
            user.push({
              ...data,
              dob: data.dob ? data.dob.toDate().toISOString() : null,
              docId: doc.id,
            } as UserData);
          }
        });
      });
    return res.json({
      data: user[0],
      success: true,
    });
  } catch (error) {
    return res.json({
      data: new Error(error as string).message,
      success: false,
    });
  }
}
