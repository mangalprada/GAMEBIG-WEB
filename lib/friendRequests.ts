import { db } from 'firebase/firebaseClient';

type User = {
  photoURL: string;
  username: string;
  name: string;
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
      from: sendingUser.username,
      sender: {
        name: sendingUser.name,
        photoURL: sendingUser.photoURL,
        username: sendingUser.username,
      },
      receiver: {
        name: receivingUser.name,
        photoURL: receivingUser.photoURL,
        username: receivingUser.username,
      },
      to: receivingUser.username,
    })
    .then(() => {
      console.log('Friend request sent');
      alert('Friend request sent');
    })
    .catch((err) => {
      console.log(err);
    });
};

export const acceptFriendRequest = ({
  acceptingUsername,
  requestingUser,
  docId,
}: {
  acceptingUsername: string;
  requestingUser: User;
  docId: string;
}) => {
  db.collection('friends')
    .add({
      friendUsername: requestingUser.username,
      friend: {
        photoURL: requestingUser.photoURL,
        username: requestingUser.username,
        name: requestingUser.name,
      },
      username: acceptingUsername,
    })
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
