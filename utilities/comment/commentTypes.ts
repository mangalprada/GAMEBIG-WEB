import { BasicUserType } from '../types';
import { Descendant } from 'slate';

export interface CommentType {
  _id?: any;
  postId: string;
  content: Descendant[];
  createdAt: any;
  user: BasicUserType;
  noOfLikes: number;
  noOfReplies: 0;
  likedBy: string[];
  repliedBy: string[];
}
