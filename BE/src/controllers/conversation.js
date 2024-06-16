import Conversation from "../models/conversation.js";

export const createConversation = async (req, res) => {
  try {
    const isConversation = await Conversation.findOne({
      participant: req.body.participant,
    });
    if (isConversation) {
      return res.send({
        message: "Đã tạo cuộc trò chuyện",
        data: isConversation,
      });
    }
    const data = await Conversation.create(req.body);
    return res.send({ message: "Tạo cuộc trò chuyện thành công", data });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Lỗi server", error });
  }
};

export const getAllConversation = async (req, res) => {
  try {
    const data = await Conversation.find().populate("participant");
    return res.send({ message: "Lấy các cuộc trò chuyện thành công", data });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Lỗi server", error });
  }
};
export const getConversationById = async (req, res) => {
  try {
    const data = await Conversation.findById(req.params.id).populate(
      "participant"
    );
    return res.send({ message: "Lấy cuộc trò chuyện thành công", data });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Lỗi server", error });
  }
};
