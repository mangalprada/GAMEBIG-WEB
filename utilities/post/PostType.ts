import { BasicUserType } from '../types';

export interface PostType {
  _id?: any;
  createdAt?: any;
  content: any;
  images?: [];
  links?: [];
  user: BasicUserType;
  noOfLikes: number;
  noOfComments: number;
  noOfShares: number;
  likedBy: string[];
  sharedBy: string[];
}
