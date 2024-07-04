import instance from "@/config/instance";
import { IMessage } from "@/interfaces/message";
export const getAllMessageByIdConversation = (id: string) => {
  const uri = `/message/${id}/conversationId`;
  return instance.get(uri);
};
export const createMessage = (payload: IMessage) => {
  const uri = `/message`;
  return instance.post(uri, payload);
};
