import { ICustomer } from "./customer";

export interface IMessage {
  _id?: string;
  conversationId?: string;
  sender?: ICustomer;
  message?: string;
  createdAt?: string;
  updatedAt?: string;
}
