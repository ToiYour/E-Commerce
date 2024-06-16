import Conversation from "../models/conversation.js";
import Message from "../models/message.js";
export const createMessage = async (req, res) => {
  try {
    const data = await Message.create(req.body);
    await Conversation.findByIdAndUpdate(req.body.conversationId, {
      lastMessage: {
        message: data.message,
        sender: req.body.sender,
        read: false,
      },
    });
    return res.send({ message: "Gửi tin nhắn thành công", data });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Lỗi server", error });
  }
};
export const getMessageByIdConversation = async (req, res) => {
  try {
    const data = await Message.find({ conversationId: req.params.id }).populate(
      "sender"
    );
    if (!data) {
      return res.status(400).send({ message: "Không tồn tại cuộc hội thoại" });
    }
    return res.send({ message: "Lấy cuộc hội thoại thành công", data });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Lỗi server", error });
  }
};
