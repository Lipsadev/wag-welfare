// src/controllers/authController.js
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { sendOTPEmail } from "../utils/emailService.js";

// ---------------- Helper: Generate Token ----------------
const generateToken = (userId) => {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) throw new Error("JWT_SECRET not defined in .env");
  return jwt.sign({ id: userId }, jwtSecret, { expiresIn: "7d" });
};

// ---------------- Signup ----------------
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required.",
      });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({
        success: false,
        message: "User already exists.",
      });

    const newUser = new User({ name, email, password });
    await newUser.save();
    console.log("✅ User saved:", newUser);

    const token = generateToken(newUser._id);
    console.log("✅ Token generated:", token);

    return res.status(201).json({
      success: true,
      message: "Signup successful!",
      token,
      user: { id: newUser._id, name: newUser.name, email: newUser.email },
    });
  } catch (error) {
    console.error("❌ Signup error:", error);
    return res.status(500).json({ success: false, message: "Signup failed." });
  }
};

// ---------------- Login with Password ----------------
export const loginWithPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(401).json({
        success: false,
        message: "Invalid password.",
      });

    const token = generateToken(user._id);
    console.log("✅ Token generated:", token);

    return res.status(200).json({
      success: true,
      message: "Login successful!",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("❌ Login error:", error);
    return res.status(500).json({ success: false, message: "Login failed." });
  }
};

// ---------------- Login via OTP ----------------
export const loginWithOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email)
      return res.status(400).json({ success: false, message: "Email is required." });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ success: false, message: "User not found." });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    user.otp = { code: otp, expiresAt, verified: false };
    await user.save();

    const emailResult = await sendOTPEmail(email, otp, "login");
    console.log(`[DEBUG OTP] ${email} -> ${otp} (purpose: login)`);

    return res.status(200).json({
      success: true,
      message: emailResult.otp
        ? "OTP sent (check console or response)"
        : emailResult.message,
      otp: emailResult.otp || null,
    });
  } catch (error) {
    console.error("❌ OTP login error:", error);
    return res.status(500).json({ success: false, message: "Failed to send OTP." });
  }
};

// ---------------- Verify Login OTP ----------------
export const verifyLoginOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user || !user.otp?.code)
      return res.status(400).json({ success: false, message: "OTP not found or expired." });

    if (user.otp.code !== otp || user.otp.expiresAt < new Date())
      return res.status(400).json({ success: false, message: "Invalid or expired OTP." });

    user.otp = { code: null, expiresAt: null, verified: true };
    await user.save();

    const token = generateToken(user._id);

    return res.status(200).json({
      success: true,
      message: "Login successful!",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("❌ Verify OTP error:", error);
    return res.status(500).json({ success: false, message: "OTP verification failed." });
  }
};

// ---------------- Forgot Password ----------------
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email)
      return res.status(400).json({ success: false, message: "Email is required." });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ success: false, message: "User not found." });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    user.otp = { code: otp, expiresAt, verified: false };
    await user.save();

    const emailResult = await sendOTPEmail(email, otp, "reset");
    console.log(`[DEBUG OTP] ${email} -> ${otp} (purpose: reset)`);

    return res.status(200).json({
      success: true,
      message: emailResult.otp
        ? "OTP sent (check console or response)"
        : emailResult.message,
      otp: emailResult.otp || null,
    });
  } catch (error) {
    console.error("❌ Forgot password error:", error);
    return res.status(500).json({ success: false, message: "Failed to send OTP." });
  }
};

// ---------------- Verify Forgot Password OTP ----------------
export const verifyForgotPasswordOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user || !user.otp?.code)
      return res.status(404).json({ success: false, message: "User or OTP not found." });

    if (user.otp.code !== otp || user.otp.expiresAt < new Date())
      return res.status(400).json({ success: false, message: "Invalid or expired OTP." });

    user.otp.verified = true;
    await user.save();

    return res.status(200).json({ success: true, message: "OTP verified successfully." });
  } catch (error) {
    console.error("❌ Verify forgot password OTP error:", error);
    return res.status(500).json({ success: false, message: "OTP verification failed." });
  }
};

// ---------------- Reset Password ----------------
export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ success: false, message: "User not found." });

    if (!user.otp?.verified)
      return res.status(400).json({ success: false, message: "OTP not verified." });

    user.password = newPassword; // hashed automatically via pre-save hook
    user.otp = { code: null, expiresAt: null, verified: false };
    await user.save();

    const token = generateToken(user._id);

    return res.status(200).json({
      success: true,
      message: "Password reset successful.",
      token,
    });
  } catch (error) {
    console.error("❌ Reset password error:", error);
    return res.status(500).json({ success: false, message: "Password reset failed." });
  }
};
