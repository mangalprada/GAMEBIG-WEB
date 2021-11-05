import { FriendRequest } from '@/utilities/friends/friends';
import { UserData } from '@/utilities/types';
import { db } from 'firebase/firebaseClient';

export const updateUser = async (userData: UserData) => {
  try {
    await db.collection('users').doc(userData.uid).update(userData);
  } catch (err) {
    console.log('err', err);
  }
};

export const createUser = async (userData: UserData) => {
  try {
    await db.collection('users').doc(userData.uid).set(userData);
  } catch (err) {
    console.log('err', err);
  }
};

export const getUserData = async (uid: string) => {
  let user: UserData = {} as UserData;
  await db
    .collection('users')
    .doc(uid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        user = doc.data() as UserData;
      } else {
        console.log('No such document!');
      }
    })
    .catch((error) => {
      console.log('Error getting documents: ', error);
    });
  return user;
};

export const getFriendRequests = (username: string) => {
  const requests: FriendRequest[] = [];
  db.collection('friendRequests')
    .where('to', '==', username)
    .get()
    .then((querySnapshot) =>
      querySnapshot.forEach((doc) => {
        requests.push({
          id: doc.id,
          ...(doc.data() as FriendRequest),
        });
      })
    )
    .catch((err) => console.log(err));
  return requests;
};

export const isUsernameTaken = async (username: string, uid: string) =>
  await db
    .collection('users')
    .where('username', '==', username)
    .where('uid', '!=', uid)
    .get()
    .then((querySnapshot) => {
      if (querySnapshot.size > 0) {
        return true;
      }
      return false;
    })
    .catch((error) => {
      console.log('Error getting documents: ', error);
      return false;
    });

export const updateFcmToken = async (uid: string, token: string) => {
  await db
    .collection('users')
    .doc(uid)
    .update({
      fcmToken: token,
    })
    .catch((err) => console.log(err));
};
