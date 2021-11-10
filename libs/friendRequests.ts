import { db } from 'firebase/firebaseClient';

type User = {
  photoURL: string;
  username: string;
  name: string;
  uid: string;
};

export const sendFriendRequest = ({
  sendingUser,
  receivingUser,
}: {
  receivingUser: User;
  sendingUser: User;
}) => {
  db.collection('friendRequests')
    .add({
      senderUid: sendingUser.uid,
      sender: {
        name: sendingUser.name,
        photoURL: sendingUser.photoURL,
        username: sendingUser.username,
        uid: sendingUser.uid,
      },
      receiver: {
        name: receivingUser.name,
        photoURL: receivingUser.photoURL,
        username: receivingUser.username,
        uid: receivingUser.uid,
      },
      receiverUid: receivingUser.uid,
    })
    .then(() => {
      console.log('Friend request sent');
    })
    .catch((err) => {
      console.log(err);
    });
};

export const acceptFriendRequest = ({
  acceptingUser,
  requestingUser,
  docId,
}: {
  acceptingUser: User;
  requestingUser: User;
  docId: string;
}) => {
  db.collection('users')
    .doc(acceptingUser.uid)
    .collection('friends')
    .add(requestingUser)
    .then(() => {
      console.log('Friend request accepted');
    })
    .catch((err) => {
      console.log(err);
    });
  db.collection('users')
    .doc(requestingUser.uid)
    .collection('friends')
    .add(acceptingUser)
    .then(() => {
      console.log('Friend request accepted');
    })
    .catch((err) => {
      console.log(err);
    });
  deleteFriendRequest(docId);
};

export const deleteFriendRequest = (id: string) => {
  db.collection('friendRequests')
    .doc(id)
    .delete()
    .then(() => {
      console.log('Friend request ignored');
    })
    .catch((err) => {
      console.log(err);
    });
};
