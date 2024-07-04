import mongoose from "mongoose";
const ReplyCommentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    parentReply: {
      type: mongoose.Types.ObjectId,
      ref: "ReplyComment",
      default: null,
    },
    likes: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Customer",
      },
    ],
    dislikes: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Customer",
      },
    ],
  },
  {
    timestamps: true,
  }
);
const ReplyCommentModel = mongoose.model("ReplyComment", ReplyCommentSchema);
export default ReplyCommentModel;
