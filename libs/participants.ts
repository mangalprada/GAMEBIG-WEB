import { connectToDatabase } from '../mongoDB/mongodbClient';
const ObjectId = require('mongodb').ObjectId;

export async function addParticipant(req: { body: any }, res: { json: any }) {
  try {
    let { db } = await connectToDatabase();
    const {
      body: {
        data: { eventId, slotNumber },
      },
    } = req;
    let participants = await db
      .collection('participants')
      .find({ eventId, slotNumber })
      .toArray();

    if (participants.length === 0) {
      let event = await db
        .collection('events')
        .findOne({ _id: new ObjectId(eventId) });

      await db.collection('events').updateOne(
        {
          _id: new ObjectId(eventId),
        },
        {
          $set: {
            noOfSlots: event.noOfSlots - 1,
            slots: { ...event.slots, [slotNumber]: 'booked' },
          },
        }
      );
      await db.collection('participants').insertOne(req.body.data);
    } else {
      return res.json({
        message: 'The Slot Number is taken. Please try another one.',
        reason: 'Slot_Taken',
        success: false,
      });
    }

    return res.json({
      message: 'Booking Successful',
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      message: 'Something went wrong',
      success: false,
    });
  }
}

export async function getParticipantsByEventId(req: any, res: any) {
  try {
    let { db } = await connectToDatabase();
    const { eventId } = req.query;
    let participants = await db
      .collection('participants')
      .find({ eventId })
      .sort({ slotNumber: 1 })
      .toArray();
    return res.json({
      data: JSON.parse(JSON.stringify(participants)),
      success: true,
    });
  } catch (error) {
    return res.json({
      data: new Error(error as string).message,
      success: false,
    });
  }
}

export async function updateParticipant(
  req: { body: any },
  res: { json: (arg0: { message: string; success: boolean }) => any }
) {
  try {
    let { db } = await connectToDatabase();
    const { id, data } = req.body;
    const x = await db.collection('participants').updateOne(
      {
        _id: new ObjectId(id),
      },
      data
    );
    return res.json({
      message: 'Participant updated successfully',
      success: true,
    });
  } catch (error) {
    return res.json({
      message: new Error(error as string).message,
      success: false,
    });
  }
}

export async function deleteParticipant(
  req: any,
  res: { json: (arg0: { message: string; success: boolean }) => any }
) {
  try {
    const { _id } = req.query;
    let { db } = await connectToDatabase();

    await db.collection('participants').deleteOne({
      _id: new ObjectId(_id),
    });
    return res.json({
      message: 'Post deleted successfully',
      success: true,
    });
  } catch (error) {
    return res.json({
      message: new Error(error as string).message,
      success: false,
    });
  }
}

export async function getParicipantByUidInEvent(
  req: any,
  res: { json: (arg0: { message: any; success: boolean }) => any }
) {
  try {
    let { db } = await connectToDatabase();
    const { eventId, uid } = req.query;
    let response = await db
      .collection('participants')
      .find({ eventId, users: { $elemMatch: { uid } } })
      .toArray();

    return res.json({
      message: JSON.parse(JSON.stringify(response)),
      success: true,
    });
  } catch (error) {
    return res.json({
      message: new Error(error as string).message,
      success: false,
    });
  }
}
