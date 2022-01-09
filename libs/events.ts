import { connectToDatabase } from '../mongoDB/mongodbClient';
const ObjectId = require('mongodb').ObjectId;

export async function addEvent(
  req: { body: any },
  res: { json: (arg0: { message: string; success: boolean }) => any }
) {
  try {
    // connect to the database
    let { db } = await connectToDatabase();
    // add the event
    await db.collection('events').insertOne(req.body.data);
    // return a message

    return res.json({
      message: 'Event added successfully',
      success: true,
    });
  } catch (error) {
    return res.json({
      message: new Error(error as string).message,
      success: false,
    });
  }
}

export async function getEvents(
  req: any,
  res: { json: (arg0: { message: any; success: boolean }) => any }
) {
  try {
    // connect to the database
    let { db } = await connectToDatabase();
    // fetch the events
    let events = await db
      .collection('events')
      .find({ startTime: { $gte: new Date().toISOString() } })
      .sort({ startTime: 1 })
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

export async function getEventsByPageId(
  req: any,
  res: { json: (arg0: { message: any; success: boolean }) => any }
) {
  try {
    const { pageId } = req.query;

    // connect to the database
    let { db } = await connectToDatabase();
    // fetch the events
    let events = await db
      .collection('events')
      .find({ pageId: { $eq: pageId } })
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

export async function getEventById(
  req: any,
  res: { json: (arg0: { message: any; success: boolean }) => any }
) {
  try {
    const { id } = req.query;

    // connect to the database
    let { db } = await connectToDatabase();
    // fetch the events
    let events = await db
      .collection('events')
      .findOne({ _id: new ObjectId(id) });

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

export async function updateEvent(
  req: { body: any },
  res: { json: (arg0: { message: string; success: boolean }) => any }
) {
  try {
    // connect to the database
    let { db } = await connectToDatabase();
    const { _id, data } = req.body;
    // update the published status of the event
    await db.collection('events').updateOne(
      {
        _id: new ObjectId(_id),
      },
      data
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

export async function deleteEvent(
  req: any,
  res: { json: (arg0: { message: string; success: boolean }) => any }
) {
  try {
    const { _id } = req.query;
    // Connecting to the database
    let { db } = await connectToDatabase();

    // Deleting the event
    await db.collection('events').deleteOne({
      _id: new ObjectId(_id),
    });
    // returning a message
    return res.json({
      message: 'Event deleted successfully',
      success: true,
    });
  } catch (error) {
    // returning an error
    return res.json({
      message: new Error(error as string).message,
      success: false,
    });
  }
}
