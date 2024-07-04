import express from "express";
import {
  createConversation,
  getAllConversation,
  getConversationById,
} from "../controllers/conversation.js";
const router = express.Router();
router.post("/", createConversation);
router.get("/", getAllConversation);
router.get("/:id", getConversationById);
export default router;
