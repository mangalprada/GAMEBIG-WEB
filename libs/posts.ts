import { connectToDatabase } from '../mongoDB/mongodbClient';
const ObjectId = require('mongodb').ObjectId;

export async function addPost(
  req: { body: string },
  res: { json: (arg0: { message: string; success: boolean }) => any }
) {
  try {
    // connect to the database
    let { db } = await connectToDatabase();
    // add the post
    await db.collection('posts').insertOne(JSON.parse(req.body));
    // return a message

    return res.json({
      message: 'Post added successfully',
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

export async function getPosts(
  req: any,
  res: { json: (arg0: { message: any; success: boolean }) => any }
) {
  try {
    // connect to the database
    let { db } = await connectToDatabase();
    // fetch the posts
    let posts = await db
      .collection('posts')
      .find({})
      .sort({ published: -1 })
      .toArray();
    // return the posts
    return res.json({
      message: JSON.parse(JSON.stringify(posts)),
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

export async function getPostsByUid(
  req: any,
  res: { json: (arg0: { message: any; success: boolean }) => any }
) {
  try {
    const { uid } = req.query;

    // connect to the database
    let { db } = await connectToDatabase();
    // fetch the posts
    let posts = await db
      .collection('posts')
      .find({ 'user.uid': { $eq: uid } })
      .sort({ published: -1 })
      .toArray();
    // return the posts
    return res.json({
      message: JSON.parse(JSON.stringify(posts)),
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

export async function updatePost(
  req: { body: any },
  res: { json: (arg0: { message: string; success: boolean }) => any }
) {
  try {
    // connect to the database
    let { db } = await connectToDatabase();

    // update the published status of the post
    await db.collection('posts').updateOne(
      {
        _id: new ObjectId(req.body),
      },
      { $set: { published: true } }
    );

    // return a message
    return res.json({
      message: 'Post updated successfully',
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

export async function deletePost(
  req: any,
  res: { json: (arg0: { message: string; success: boolean }) => any }
) {
  try {
    const { _id } = req.query;
    // Connecting to the database
    let { db } = await connectToDatabase();

    // Deleting the post
    await db.collection('posts').deleteOne({
      _id: new ObjectId(_id),
    });
    db.collection('commentsOnPost').deleteMany({ postId: _id });

    // returning a message
    return res.json({
      message: 'Post deleted successfully',
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
