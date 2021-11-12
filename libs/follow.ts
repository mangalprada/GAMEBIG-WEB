import { BasicUserType } from '@/utilities/types';
import { db } from 'firebase/firebaseClient';

export const follow = ({
  follower,
  followee,
}: {
  follower: BasicUserType;
  followee: BasicUserType;
}) => {
  db.collection('users')
    .doc(followee.uid)
    .collection('followers')
    .doc(follower.uid)
    .set(follower)
    .then(() => {
      console.log('Suceess');
    })
    .catch((err) => {
      console.log(err);
    });
  db.collection('users')
    .doc(follower.uid)
    .collection('following')
    .doc(followee.uid)
    .set(followee)
    .then(() => {
      console.log('Suceess');
    })
    .catch((err) => {
      console.log(err);
    });
};

export const unfollow = () => {};
