import Conversation from "../models/conversation.js";
import Customer from "../models/customer.js";
import Message from "../models/message.js";
const getAllIdConversationSocket = async () => {
  try {
    const data = await Conversation.find().select("_id");
    const newDataId = data.map((d) => d._id.toHexString());
    return newDataId;
  } catch (error) {
    console.log(error);
  }
};
let listRoomSocket;
getAllIdConversationSocket().then((document) => (listRoomSocket = document));
const saveMessagesSocketToDatabase = async (data) => {
  try {
    await Message.create(data);
    await Conversation.findByIdAndUpdate(data.conversationId, {
      lastMessage: {
        message: data.message,
        sender: data.sender,
        read: false,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
const updateOperatingStatus = async (id, status, status_at) => {
  await Customer.findByIdAndUpdate(id, {
    status: status,
    status_at: status_at,
  });
};
export { listRoomSocket, saveMessagesSocketToDatabase, updateOperatingStatus };
