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
  try {
    let users: UserData[] = [];
    await firebaseAdmin
      .firestore()
      .collection('users')
      .limit(36)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data) {
            users.push({
              ...data,
              dob: formatDate(data.dob),
              docId: doc.id,
            } as UserData);
          }
        });
      });

    return res.json({
      users,
      success: true,
    });
  } catch (error) {
    return res.json({
      message: new Error(error as string).message,
      success: false,
    });
  }
}
