import { connectToDatabase } from '../../mongoDB/mongodbClient';
const ObjectId = require('mongodb').ObjectId;

export default async function handler(req: any, res: any) {
  try {
    const { postId, likedBy, unLikedBy } = req.query;
    // connect to the database
    let { db } = await connectToDatabase();

    // update the published status of the post
    if (likedBy) {
      await db.collection('posts').updateOne(
        {
          _id: ObjectId(postId),
        },
        { $inc: { noOfLikes: 1 }, $push: { likedBy } }
      );
    }
    if (unLikedBy) {
      await db.collection('posts').updateOne(
        {
          _id: ObjectId(postId),
        },
        { $inc: { noOfLikes: -1 }, $pull: { likedBy: unLikedBy } }
      );
    }

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
