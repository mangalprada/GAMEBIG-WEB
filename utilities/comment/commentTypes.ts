import { BasicUserType } from '../types';

export interface CommentType {
  _id?: any;
  postId: string;
  content: string;
  createdAt: any;
  user: BasicUserType;
  noOfLikes: number;
  noOfReplies: 0;
  likedBy: string[];
  repliedBy: string[];
}
