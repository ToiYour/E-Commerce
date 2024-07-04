import { ICustomer } from "./customer";

export interface IComment {
  _id?: string;
  userId?: ICustomer;
  productId?: string;
  comment?: string;
  likes?: string[];
  dislikes?: string[];
  replies?: ICommentReply[];
  createdAt: string;
  updatedAt: string;
}
export interface ICommentReply extends IComment {
  parentReply: ICommentReply;
}
