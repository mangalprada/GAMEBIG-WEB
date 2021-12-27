import { connectToDatabase } from '../mongoDB/mongodbClient';
const ObjectId = require('mongodb').ObjectId;

export async function addCommentOnPost(
  req: { body: string },
  res: { json: (arg0: { message: string; success: boolean }) => any }
) {
  try {
    // connect to the database
    let { db } = await connectToDatabase();
    const commentData = JSON.parse(req.body);
    // add the post
    await db.collection('commentsOnPost').insertOne(commentData);
    await db.collection('posts').updateOne(
      {
        _id: ObjectId(commentData.postId),
      },
      { $inc: { noOfComments: 1 } }
    );
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

export async function getCommentsOnPost(
  req: any,
  res: { json: (arg0: { message: any; success: boolean }) => any }
) {
  try {
    const { postId } = req.query;
    // connect to the database
    let { db } = await connectToDatabase();
    // fetch the fetch comments on post
    let commentsOnPost = await db
      .collection('commentsOnPost')
      .find({ postId: { $eq: postId } })
      .sort({ published: -1 })
      .toArray();
    // return the comments on post
    return res.json({
      message: JSON.parse(JSON.stringify(commentsOnPost)),
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

export async function updateCommentOnPost(
  req: any,
  res: { json: (arg0: { message: string; success: boolean }) => any }
) {
  try {
    const { _id, content } = req.query;
    // connect to the database
    let { db } = await connectToDatabase();

    // update the published status of the post
    await db.collection('commentsOnPost').updateOne(
      {
        _id,
      },
      { $set: { content } }
    );
    console.log({ _id, content }, req.query);

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

export async function deleteCommentOnPost(
  req: any,
  res: { json: (arg0: { message: string; success: boolean }) => any }
) {
  try {
    const { commentId, postId } = req.query;
    // Connecting to the database
    let { db } = await connectToDatabase();

    // Deleting the post
    await db.collection('commentsOnPost').deleteOne({
      _id: new ObjectId(commentId),
    });
    await db.collection('posts').updateOne(
      {
        _id: ObjectId(postId),
      },
      { $inc: { noOfComments: -1 } }
    );
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
