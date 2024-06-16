import mongoose from "mongoose";
const MessageShema = new mongoose.Schema(
  {
    conversationId: { type: mongoose.Types.ObjectId, ref: "Conversation" },
    sender: { type: mongoose.Types.ObjectId, ref: "Customer" },
    message: String,
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Message", MessageShema);
