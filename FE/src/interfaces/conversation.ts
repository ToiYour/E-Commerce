import { ICustomer } from "./customer";

export interface IConversation {
  createdAt?: string;
  lastMessage?: { message: string; sender: string; read: boolean };
  participant?: ICustomer;
  updatedAt?: string;
  _id?: string;
}
