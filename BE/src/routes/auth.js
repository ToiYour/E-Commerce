import express from "express";
import {
  changePassword,
  changeProfileInformation,
  getUser,
  loginAccount,
  logOut,
  refreshToken,
  setAPasswordForTheLinkedAccount,
  signInWithGoogleAndFacebook,
} from "../controllers/auth.js";
import { authenticate } from "../middleware/auth.js";
const router = express.Router();
router.post("/login", loginAccount);
router.post("/signInWithGoogleAndFacebook", signInWithGoogleAndFacebook);
router.post("/refreshToken", refreshToken);
router.get("/accountIsLoggedIn", authenticate, getUser);
router.delete("/logOutAccount", logOut);
router.post(
  "/changeProfileInformation",
  authenticate,
  changeProfileInformation
); // thay đổi thông tin account client
router.patch("/changePassword", authenticate, changePassword); // thay đổi mật khẩu
router.patch(
  "/setAPasswordForTheLinkedAccount",
  authenticate,
  setAPasswordForTheLinkedAccount
); // Đặt  mật khẩu tài khoản liên kết

export default router;
