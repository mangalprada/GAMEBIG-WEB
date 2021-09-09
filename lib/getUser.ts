import { db } from '../firebase/config';
import { UserData } from '../utilities/types';

const getUser = async (username: string) => {
  const user: UserData[] = [];
  await db
    .collection('users')
    .where('username', '==', username)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data() as UserData;
        user.push({ ...data, docId: doc.id });
      });
    })
    .catch((error) => {
      console.log('Error getting documents: ', error);
    });

  return user[0];
};

export default getUser;
