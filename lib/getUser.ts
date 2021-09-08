import { db } from '../firebase/config';
import { UserData } from '../utilities/types';

const getUser = async (username: string) => {
  let user: UserData | null = null;
  db.collection('users')
    .where('capital', '==', true)
    .get()
    .then((querySnapshot) => {
      const temp: UserData[] = [];
      querySnapshot.forEach((doc) => {
        temp.push(doc.data() as UserData);
      });
      user = temp[0];
    })
    .catch((error) => {
      console.log('Error getting documents: ', error);
    });
  return user;
};

export default getUser;
