import {
  getCommentsOnPost,
  addCommentOnPost,
  deleteCommentOnPost,
  updateCommentOnPost,
} from '../../libs/commentOnPost';

export default async function handler(req: any, res: any) {
  // switch the methods
  switch (req.method) {
    case 'GET': {
      return getCommentsOnPost(req, res);
    }

    case 'POST': {
      return addCommentOnPost(req, res);
    }

    case 'PUT': {
      return updateCommentOnPost(req, res);
    }

    case 'DELETE': {
      return deleteCommentOnPost(req, res);
    }
  }
}
