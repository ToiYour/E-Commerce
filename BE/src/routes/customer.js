import express from "express";
import {
  compareOTP,
  createCustomer,
  deleteAllCustomers,
  deleteByIdCustomer,
  forgotPassword,
  getAllCustomers,
  getByIdCustomer,
  resetPassword,
  updateAccoutStatus,
  updateCustomer,
} from "../controllers/customer.js";
import { CustomerValid } from "../middleware/customer.js";
const router = express.Router();
router.post("/", CustomerValid, createCustomer);
router.put("/:id", updateCustomer);
router.get("/", getAllCustomers);
router.get("/:id", getByIdCustomer);
router.delete("/:id", deleteByIdCustomer);
router.post("/delete-forever", deleteAllCustomers);
router.patch("/update-status/:id", updateAccoutStatus);
router.post("/forgot-password", forgotPassword);
router.post("/compare-otp", compareOTP);
router.patch("/reset-password", resetPassword);
export default router;
