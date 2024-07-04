import express from "express";
import {
  createOrderPayUponReceipt,
  getOrderById,
  getOrderByUserId,
  updateOrderStatus,
  verifyOrderPayUponReceipt,
} from "../../controllers/orders/order.js";
import { authenticate } from "../../middleware/auth.js";
const router = express.Router();
router.get("/:id/orderById", getOrderById);
router.get("/:id/verifyOrderPayUponReceipt", verifyOrderPayUponReceipt);
router.post(
  "/order_and_pay_upon_receipt",
  authenticate,
  createOrderPayUponReceipt
);
router.get("/myOrder", authenticate, getOrderByUserId);
router.patch("/updateOrderStatus", updateOrderStatus);
export default router;
