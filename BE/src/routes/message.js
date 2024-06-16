import express from "express";
import {
  createMessage,
  getMessageByIdConversation,
} from "../controllers/message.js";
const router = express.Router();
router.post("/", createMessage);
router.get("/:id/conversationId", getMessageByIdConversation);
export default router;
