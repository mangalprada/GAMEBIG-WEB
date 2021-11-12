import { firebaseAdmin } from '../firebase/firebaseAdmin';
import { UserData } from '../utilities/types';

const getUser = async (username: string) => {
  const user: any[] = [];
  await firebaseAdmin
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        console.log('DOB type - ', typeof data.dob);

        if (data) {
          user.push({
            ...data,
            dob: data.dob ? data.dob.toDate().toISOString() : null,
            docId: doc.id,
          });
        }
      });
    })
    .catch((error) => {
      console.log('Error getting documents: ', error);
    });

  return user[0];
};

export default getUser;
