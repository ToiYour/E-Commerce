import express from "express";
import { paymentMomo } from "../controllers/payments/momo.js";
import {
  createPaymentVNPay,
  vnpayReturn,
} from "../controllers/payments/vnpay.js";
import { authenticate } from "../middleware/auth.js";
const router = express.Router();
router.post("/momo", paymentMomo);
router.post("/create_payment_url_vnpay", authenticate, createPaymentVNPay);
router.get("/vnpay_return", vnpayReturn);
export default router;
