import express from "express";
import {
  signup,
  loginWithPassword,
  loginWithOTP,
  verifyLoginOTP,
  forgotPassword,
  resetPassword,
  verifyForgotPasswordOTP, // 🔹 add this
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login-password", loginWithPassword);
router.post("/login-otp", loginWithOTP);
router.post("/verify-login-otp", verifyLoginOTP);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/verify-forgot-password-otp", verifyForgotPasswordOTP); // 🔹 new

export default router;
