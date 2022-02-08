import { connectToDatabase } from '../../../mongoDB/mongodbClient';

export default async function handler(
  req: any,
  res: { json: (arg0: { message: any; success: boolean }) => any }
) {
  try {
    var d1 = new Date(),
      d2 = new Date(d1);
    d2.setMinutes(d1.getMinutes() - 50);
    // connect to the database
    let { db } = await connectToDatabase();
    // fetch the events
    let events = await db
      .collection('events')
      .find({
        $and: [
          { startTime: { $lte: new Date().toISOString() } },
          { startTime: { $gte: d2.toISOString() } },
          { entryFee: { $eq: 0 } },
        ],
      })
      .sort({ startTime: -1 })
      .toArray();
    // return the events
    return res.json({
      message: JSON.parse(JSON.stringify(events)),
      success: true,
    });
  } catch (error) {
    // return the error
    return res.json({
      message: new Error(error as string).message,
      success: false,
    });
  }
}
