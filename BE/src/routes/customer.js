import express from "express";
import {
  authenticateToken,
  changePassword,
  compareOTP,
  createCustomer,
  createUserWithGoogleAndFacebook,
  deleteAllCustomers,
  deleteByIdCustomer,
  forgotPassword,
  getAllCustomers,
  getByIdCustomer,
  loginAccount,
  logOut,
  newPasswordAccountLink,
  resetPassword,
  updateAccoutStatus,
  updateCustomer,
} from "../controllers/customer.js";
import { CustomerValid, loginValid } from "../middleware/customer.js";
const router = express.Router();
router.post("/", CustomerValid, createCustomer);
router.put("/:id", updateCustomer);
router.get("/", getAllCustomers);
router.get("/:id", getByIdCustomer);
router.delete("/:id", deleteByIdCustomer);
router.post("/delete-forever", deleteAllCustomers);
router.patch("/update-status/:id", updateAccoutStatus);
router.post("/me", authenticateToken);
router.post("/login", loginValid, loginAccount);
router.post("/logout", logOut);
router.post("/forgot-password", forgotPassword);
router.post("/compare-otp", compareOTP);
router.patch("/reset-password", resetPassword);
router.patch("/change-password", changePassword);
router.post("/loginWithGoogleOrFacebook", createUserWithGoogleAndFacebook);
router.patch("/newPasswordAccountLink", newPasswordAccountLink);
export default router;
