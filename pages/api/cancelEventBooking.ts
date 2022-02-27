import { connectToDatabase } from '../../mongoDB/mongodbClient';
const ObjectId = require('mongodb').ObjectId;

export default async function handler(
  req: { body: any },
  res: { json: (arg0: { message: string; success: boolean }) => any }
) {
  try {
    // connect to the database
    let { db } = await connectToDatabase();
    const { participantId, eventId, slotNo } = req.body;

    let event = await db
      .collection('events')
      .findOne({ _id: new ObjectId(eventId) });

    await db.collection('participants').deleteOne({
      _id: new ObjectId(participantId),
    });

    // update the published status of the event
    await db.collection('events').updateOne(
      {
        _id: new ObjectId(eventId),
      },
      {
        $set: {
          noOfSlots: event.noOfSlots + 1,
          slots: { ...event.slots, [slotNo]: 'available' },
        },
      }
    );

    // return a message
    return res.json({
      message: 'Event updated successfully',
      success: true,
    });
  } catch (error) {
    // return an error
    return res.json({
      message: new Error(error as string).message,
      success: false,
    });
  }
}
