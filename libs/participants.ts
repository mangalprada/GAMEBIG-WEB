import { connectToDatabase } from '../mongoDB/mongodbClient';
const ObjectId = require('mongodb').ObjectId;

export async function addParticipant(
  req: { body: any },
  res: { json: (arg0: { message: string; success: boolean }) => any }
) {
  try {
    let { db } = await connectToDatabase();
    await db.collection('participants').insertOne(req.body.data);

    return res.json({
      message: 'Participant added successfully',
      success: true,
    });
  } catch (error) {
    return res.json({
      message: new Error(error as string).message,
      success: false,
    });
  }
}

export async function getParticipantsByEventId(
  req: any,
  res: { json: (arg0: { message: any; success: boolean }) => any }
) {
  try {
    let { db } = await connectToDatabase();
    const { eventId } = req.query;
    let participants = await db
      .collection('participants')
      .find({ eventId })
      .toArray();
    return res.json({
      message: JSON.parse(JSON.stringify(participants)),
      success: true,
    });
  } catch (error) {
    return res.json({
      message: new Error(error as string).message,
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

export async function isUserRegistered(
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
      message: JSON.parse(JSON.stringify(response.length > 0)),
      success: true,
    });
  } catch (error) {
    return res.json({
      message: new Error(error as string).message,
      success: false,
    });
  }
}
