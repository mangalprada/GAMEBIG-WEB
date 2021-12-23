import { firebaseAdmin } from '../firebase/firebaseAdmin';

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
        if (data) {
          user.push({
            ...data,
            dob: data.dob
              ? data.dob.toDate().toISOString()
              : new Date().toISOString(),
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
