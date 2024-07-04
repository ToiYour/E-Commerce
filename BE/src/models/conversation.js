import mongoose from "mongoose";
const ConversationShema = new mongoose.Schema(
  {
    participant: { type: mongoose.Types.ObjectId, ref: "Customer" },
    lastMessage: {
      message: String,
      sender: { type: mongoose.Types.ObjectId, ref: "Customer" },
      read: Boolean,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Conversation", ConversationShema);
