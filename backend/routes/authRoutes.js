import express from "express";
import {
  signup,
  loginWithPassword,
  loginWithOTP,
  verifyLoginOTP,
  forgotPassword,
  verifyForgotPasswordOTP,
  resetPassword,
} from "../controllers/authController.js";

const router = express.Router();

// Auth routes
router.post("/signup", signup);
router.post("/login-password", loginWithPassword);
router.post("/login-otp", loginWithOTP);
router.post("/verify-login-otp", verifyLoginOTP);
router.post("/forgot-password", forgotPassword);
router.post("/verify-forgot-password-otp", verifyForgotPasswordOTP); // ✅ Add this
router.post("/reset-password", resetPassword);

export default router;
