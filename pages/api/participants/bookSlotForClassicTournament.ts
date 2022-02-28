import { connectToDatabase } from '../../../mongoDB/mongodbClient';
const ObjectId = require('mongodb').ObjectId;

export default async function handler(req: { body: any }, res: any) {
  try {
    let { db } = await connectToDatabase();
    const {
      body: { data },
    } = req;

    let event = await db
      .collection('events')
      .findOne({ _id: new ObjectId(data.eventId) });

    await db.collection('events').updateOne(
      {
        _id: new ObjectId(data.eventId),
      },
      {
        $set: {
          noOfSlots: event.noOfSlots - 1,
        },
      }
    );
    await db.collection('participants').insertOne(data);
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
