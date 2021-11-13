import { firebaseAdmin } from '../firebase/firebaseAdmin';

const getUsers = async () => {
  const user: any[] = [];
  await firebaseAdmin
    .firestore()
    .collection('users')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
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

  return user;
};

export default getUsers;
