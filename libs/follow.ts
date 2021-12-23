import { BasicUserType } from '@/utilities/types';
import firebase, { db } from 'firebase/firebaseClient';

function updateFollowersCount(uid: string, count: number) {
  try {
    db.collection('users')
      .doc(uid)
      .update({
        followersCount: firebase.firestore.FieldValue.increment(count),
      });
  } catch (err) {
    console.log(err);
  }
}

function updateFolloweesCount(uid: string, count: number) {
  try {
    db.collection('users')
      .doc(uid)
      .update({
        followeesCount: firebase.firestore.FieldValue.increment(count),
      });
  } catch (err) {
    console.log(err);
  }
}

export function unfollow(follwerUid: string, followeeUid: string) {
  db.collection('users')
    .doc(follwerUid)
    .collection('followees')
    .doc(followeeUid)
    .delete();

  db.collection('users')
    .doc(followeeUid)
    .collection('followers')
    .doc(follwerUid)
    .delete();
  updateFolloweesCount(follwerUid, -1);
  updateFollowersCount(followeeUid, -1);
}

export const follow = (follower: BasicUserType, followee: BasicUserType) => {
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
    .collection('followees')
    .doc(followee.uid)
    .set(followee)
    .then(() => {
      console.log('Suceess');
    })
    .catch((err) => {
      console.log(err);
    });
  updateFolloweesCount(follower.uid, 1);
  updateFollowersCount(followee.uid, 1);
};

export const isFollowing = async (myUid: string, otherUid: string) => {
  const userDoc = await db
    .collection('users')
    .doc(myUid)
    .collection('followees')
    .doc(otherUid)
    .get();
  if (userDoc.exists) return true;
  return false;
};
