// utils/emailService.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config(); // 🔹 Load .env variables

// ---------------- Create transporter using SMTP ----------------
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT) || 587,
  secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// ---------------- Send OTP Email ----------------
/**
 * sendOTPEmail - sends an OTP email for signup/login/password reset
 * @param {string} to - recipient email
 * @param {string|number} otp - OTP code
 * @param {string} purpose - 'signup', 'login', or 'reset'
 * @returns {object} info about email or OTP log
 */
export const sendOTPEmail = async (to, otp, purpose = "signup") => {
  try {
    // ---------------- Email content ----------------
    let subject, heading, message;
    switch (purpose) {
      case "login":
        subject = "🐾 PawRescue - Login OTP";
        heading = "Login OTP Verification";
        message = "Use this OTP to login to your PawRescue account:";
        break;
      case "reset":
        subject = "🐾 PawRescue - Reset Password OTP";
        heading = "Password Reset Verification";
        message = "Use this OTP to reset your PawRescue account password:";
        break;
      default:
        subject = "🐾 PawRescue - Email Verification OTP";
        heading = "Email Verification";
        message = "Use this OTP to verify your email and complete signup:";
        break;
    }

    const mailOptions = {
      from: process.env.EMAIL_FROM || `"PawRescue 🐾" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #FF9933;">🐾 ${heading}</h2>
          <p>Hello,</p>
          <p>${message}</p>
          <h3 style="color: #75c978; font-size: 24px;">${otp}</h3>
          <p>This OTP will expire in <b>5 minutes</b>.</p>
          <p>If you did not request this, please ignore this email.</p>
          <br/>
          <p style="color:#999;">- PawRescue Team</p>
        </div>
      `,
    };

    // ---------------- Development fallback ----------------
    if (process.env.NODE_ENV !== "production") {
      console.log(`[DEV MODE] OTP for ${to} (${purpose}): ${otp}`);
      return { success: true, message: "OTP logged in console (dev mode)", otp };
    }

    // ---------------- Send email in production ----------------
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ OTP Email sent to ${to} for ${purpose}:`, info.messageId);
    return { success: true, message: "OTP sent via email", info };
  } catch (error) {
    console.error("❌ Failed to send OTP email:", error.message);
    console.log(`[DEBUG OTP] ${to} -> ${otp} (purpose: ${purpose})`);
    return { success: true, message: "Email not sent. OTP logged in console.", otp };
  }
};
