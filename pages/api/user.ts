import { UserData } from '@/utilities/types';
import { firebaseAdmin } from 'firebase/firebaseAdmin';

const formatDate = (date: any) => {
  let formatedDate = null;
  if (!date) return formatedDate;
  try {
    formatedDate = date.toDate().toISOString();
  } catch (e) {
    formatedDate = new Date(date);
  }
  return formatedDate;
};

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
              dob: formatDate(data.dob),
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
