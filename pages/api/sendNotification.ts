import { firebaseAdmin } from 'firebase/firebaseAdmin';
import PushNotifications from '@pusher/push-notifications-server';
import {
  getDecoratedDate,
  getDecoratedTime,
} from '@/utilities/functions/dateConvert';

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
            title: 'GAMEBIG event details!!',
            body: `${data.roomId} is ROOM ID, ${
              data.password
            } is PASSWORD and ${data.slotNumber} is SLOT for ${data.pageName} ${
              data.eventType
            } starting at ${getDecoratedTime(
              data.startTime
            )}, ${getDecoratedDate(data.startTime)} . Enjoy the match🥳🎉`,
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
}
