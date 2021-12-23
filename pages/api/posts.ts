import {
  getPosts,
  addPost,
  deletePost,
  updatePost,
  getPostsByUid,
} from '../../libs/posts';

export default async function handler(req: any, res: any) {
  // switch the methods
  switch (req.method) {
    case 'GET': {
      const { uid } = req.query;
      if (uid) {
        console.log(uid);

        return getPostsByUid(req, res);
      } else {
        return getPosts(req, res);
      }
    }

    case 'POST': {
      return addPost(req, res);
    }

    case 'PUT': {
      return updatePost(req, res);
    }

    case 'DELETE': {
      return deletePost(req, res);
    }
  }
}
