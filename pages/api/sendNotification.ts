import { firebaseAdmin } from 'firebase/firebaseAdmin';
import PushNotifications from '@pusher/push-notifications-server';

const { PUSHER_BEAM_INSTANCE_ID, PUSHER_BEAM_SECRET_KEY } = process.env;

async function addToUserNotification(uid: string, data: any, type: string) {
  try {
    await firebaseAdmin
      .firestore()
      .collection('users')
      .doc(uid)
      .collection('notifications')
      .add({
        data,
        type,
        isSeen: false,
        createdAt: firebaseAdmin.firestore.FieldValue.serverTimestamp(),
      });
  } catch (error) {
    console.log(error);
  }
}

async function sendPopupNotification(userId: string, data: any) {
  if (PUSHER_BEAM_INSTANCE_ID && PUSHER_BEAM_SECRET_KEY) {
    const beamsClient = new PushNotifications({
      instanceId: PUSHER_BEAM_INSTANCE_ID,
      secretKey: PUSHER_BEAM_SECRET_KEY,
    });
    await beamsClient
      .publishToUsers([userId], {
        web: {
          notification: {
            title: 'New Join Request',
            body: `${data.requestingName} wants to join your team`,
          },
        },
      })
      .then((publishResponse) => {
        console.log('Just published:', publishResponse.publishId);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
}

export default async function handler(req: any, res: any) {
  const { data, type } = req.body;
  addToUserNotification(data.postOwnerUid, data, type);
  sendPopupNotification(data.postOwnerUid, data);
}
