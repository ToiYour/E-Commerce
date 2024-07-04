import mongoose from "mongoose";
const CommentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    productId: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    likes: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Customer",
        default: null,
      },
    ],
    dislikes: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Customer",
        default: null,
      },
    ],
    replies: [
      { type: mongoose.Types.ObjectId, ref: "ReplyComment", default: null },
    ],
  },
  {
    timestamps: true,
  }
);
const CommentModel = mongoose.model("Comment", CommentSchema);
export default CommentModel;
