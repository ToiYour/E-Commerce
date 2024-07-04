import instance from "@/config/instance";
export const createConversation = (participant: string) => {
  const uri = "/conversation";
  return instance.post(uri, { participant });
};
export const getAllConversation = () => {
  const uri = "/conversation";
  return instance.get(uri);
};
export const getConversationById = (id: string) => {
  const uri = "/conversation/" + id;
  return instance.get(uri);
};
