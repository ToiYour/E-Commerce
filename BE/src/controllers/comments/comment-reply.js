import CommentModel from "../../models/comments/comment.js";
import ReplyCommentModel from "../../models/comments/reply-comment.js";

export const createCommentReply = async (req, res) => {
  try {
    const { comment, parentComment, parentReply } = req.body;
    // Tạo phản hồi mới
    const reply = await ReplyCommentModel.create({
      userId: req.user._id,
      comment,
      parentReply,
    });

    // Thêm id của phản hồi vào trường replies của bình luận cha
    await CommentModel.findByIdAndUpdate(
      parentComment,
      { $push: { replies: reply._id } },
      { new: true, useFindAndModify: false }
    );

    return res.send({ message: "Successfully", data: reply });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Lỗi server" });
  }
};
export const createNestedCommentReply = async (req, res) => {
  try {
    const { comment, parentReply } = req.body;
    // Tạo phản hồi mới
    const reply = await ReplyCommentModel.create({
      userId: req.user._id,
      comment,
      parentReply,
    });
    return res.send({ message: "Successfully", data: reply });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Lỗi server" });
  }
};
export const updateCommentReplyById = async (req, res) => {
  try {
    const commentReplyId = req.body.commentReplyId;
    const comment = req.body.comment;
    const data = await ReplyCommentModel.findByIdAndUpdate(
      commentReplyId,
      { comment: comment },
      { new: true }
    );
    return res.send({ message: "Successfully", data });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Lỗi server" });
  }
};
export const deleteCommentReplyById = async (req, res) => {
  try {
    const commentReplyId = req.params.commentReplyId;
    const data = await ReplyCommentModel.findByIdAndDelete(commentReplyId);
    return res.send({ message: "Đã xoá bình luận", data });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Lỗi server" });
  }
};
