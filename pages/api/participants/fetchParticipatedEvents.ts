import { connectToDatabase } from '../../../mongoDB/mongodbClient';
const ObjectId = require('mongodb').ObjectId;

export default async function handler(req: any, res: any) {
  try {
    const { uid } = req.query;

    // connect to the database
    let { db } = await connectToDatabase();
    // fetch the events
    let response = await db
      .collection('participants')
      .find({ users: { $elemMatch: { uid } } })
      .toArray();

    // return the events
    return res.json({
      message: JSON.parse(JSON.stringify(response)),
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
