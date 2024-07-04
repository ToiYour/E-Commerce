import express from "express";
import { authenticate } from "../middleware/auth.js";
import {
  createComment,
  deleteCommentById,
  dislikeOrUndislikeComment,
  getCommentByProductId,
  likeOrUnlikeComment,
  updateCommentById,
} from "../controllers/comments/comment.js";
import {
  createCommentReply,
  deleteCommentReplyById,
  updateCommentReplyById,
} from "../controllers/comments/comment-reply.js";
const router = express.Router();
router.post("/", authenticate, createComment);
router.get("/:slug/commentsByIdProduct", getCommentByProductId);
router.delete("/:commentId/deleteByCommentId", deleteCommentById);
router.patch("/updateByCommentId", updateCommentById);
// Comment Reply
router.post("/reply", authenticate, createCommentReply);
router.patch("/reply/updateByCommentReplyId", updateCommentReplyById);
router.delete(
  "/reply/:commentReplyId/deleteByCommentReplyId",
  deleteCommentReplyById
);
// Liked and Disliked
router.post("/liked/:action", authenticate, likeOrUnlikeComment);
router.post("/disliked/:action", authenticate, dislikeOrUndislikeComment);
export default router;
