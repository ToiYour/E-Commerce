import express from "express";
import { authenticate, authorization } from "../../middleware/auth.js";
import {
  createDiscount,
  getDiscountStillValidByIdUser,
} from "../../controllers/orders/discount.js";
const router = express.Router();
router.post("/", authorization, createDiscount);
router.get(
  "/getDiscountStillValidByIdUser",
  authenticate,
  getDiscountStillValidByIdUser
);
export default router;
