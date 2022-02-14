import { firebaseAdmin } from 'firebase/firebaseAdmin';
import { connectToDatabase } from '../../mongoDB/mongodbClient';

async function getParticipantsByEventId(eventId: string) {
  try {
    let { db } = await connectToDatabase();
    let participants = await db
      .collection('participants')
      .find({ eventId })
      .sort({ slotNumber: 1 })
      .toArray();
    return participants;
  } catch (error) {
    return null;
  }
}

async function addNotification(uid: string, data: any, type: string) {
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

export default async function handler(req: any, res: any) {
  const { data, type } = req.body;
  const participatingteams = await getParticipantsByEventId(data.eventId);
  let users: any = [];
  if (participatingteams.length > 0) {
    await participatingteams.map((participant: any) => {
      users = [...users, ...participant.users];
    });
    await users.map(async (user: any) => {
      await addNotification(user.uid, data, type);
    });
    return res.json({
      success: true,
    });
  } else {
    return res.json({
      success: false,
    });
  }
}
