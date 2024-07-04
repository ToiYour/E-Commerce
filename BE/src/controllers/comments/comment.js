import CommentModel from "../../models/comments/comment.js";
import ReplyCommentModel from "../../models/comments/reply-comment.js";
import Product from "../../models/products/product.js";

export const createComment = async (req, res) => {
  try {
    const { slug, comment } = req.body;
    const product = await Product.findOne({ slug });
    const data = await CommentModel.create({
      userId: req.user._id,
      productId: product._id,
      comment,
    });
    return res.send({ message: "Successfully", data });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Lỗi server" });
  }
};
export const getCommentByProductId = async (req, res) => {
  try {
    const { colum, sort } = req.query;
    const slug = req.params.slug;
    const arrange = colum && sort ? { [colum]: sort } : { createdAt: "desc" };
    const product = await Product.findOne({ slug });
    const data = await CommentModel.find({ productId: product._id })
      .populate("userId")
      // .populate("dislikes")
      // .populate("likes")
      .populate({
        path: "replies",
        populate: [
          { path: "userId" },
          { path: "parentReply", populate: "userId" },
          // { path: "likes" },
          // { path: "dislikes" },
        ],
      })
      .sort(arrange);
    const totalComment = await CommentModel.countDocuments({
      productId: product._id,
    });
    return res.send({
      message: "Successfully",
      data: { data, totalComment },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Lỗi server" });
  }
};
export const deleteCommentById = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const comment = await CommentModel.findById(commentId);
    const repliesId = comment?.replies?.map((reply) => reply.toString());
    await ReplyCommentModel.deleteMany({ _id: { $in: repliesId } });
    const data = await CommentModel.findByIdAndDelete(commentId);
    return res.send({ message: "Đã xoá bình luận", data });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Lỗi server" });
  }
};
export const updateCommentById = async (req, res) => {
  try {
    const commentId = req.body.commentId;
    const comment = req.body.comment;
    const data = await CommentModel.findByIdAndUpdate(
      commentId,
      { comment: comment },
      { new: true }
    );
    return res.send({ message: "Successfully", data });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Lỗi server" });
  }
};
export const likeOrUnlikeComment = async (req, res) => {
  const { commentId, commentReplyId } = req.body;
  const action = req.params.action;
  const userId = req.user._id;

  try {
    let comment;
    if (commentReplyId) {
      comment = await ReplyCommentModel.findById(commentReplyId);
    } else {
      comment = await CommentModel.findById(commentId);
    }
    if (!comment) {
      return res.status(404).json({ message: "Không tìm thấy bình luận" });
    }

    if (action === "unlike") {
      const index = comment.likes.findIndex(
        (dis) => dis?.toString() === userId?.toString()
      );
      if (index !== -1) {
        comment.likes.splice(index, 1);
      }
    } else {
      const indexDislike = comment.dislikes.findIndex(
        (dis) => dis?.toString() === userId?.toString()
      );
      if (indexDislike !== -1) {
        comment.dislikes.splice(indexDislike, 1);
      }
      if (!comment.likes.includes(userId?.toString())) {
        comment.likes.push(userId?.toString());
      }
    }
    await comment.save();
    return res.status(200).json({ message: "Successfully", comment });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};
export const dislikeOrUndislikeComment = async (req, res) => {
  const { commentId, commentReplyId } = req.body;
  const action = req.params.action;
  const userId = req.user._id;

  try {
    let comment;
    if (commentReplyId) {
      comment = await ReplyCommentModel.findById(commentReplyId);
    } else {
      comment = await CommentModel.findById(commentId);
    }
    if (!comment) {
      return res.status(404).json({ message: "Không tìm thấy bình luận" });
    }

    if (action === "undislike") {
      const index = comment.dislikes.findIndex(
        (dis) => dis?.toString() === userId?.toString()
      );
      if (index !== -1) {
        comment.dislikes.splice(index, 1);
      }
    } else {
      const index = comment.likes.findIndex(
        (dis) => dis?.toString() === userId?.toString()
      );
      if (index !== -1) {
        comment.likes.splice(index, 1);
      }
      if (!comment.dislikes.includes(userId?.toString())) {
        comment.dislikes.push(userId?.toString());
      }
    }
    await comment.save();
    return res.status(200).json({ message: "Successfully", comment });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};
