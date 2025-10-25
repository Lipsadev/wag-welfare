const nodemailer = require("nodemailer");

// Create transporter using environment variables
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // e.g., smtp.gmail.com
  port: process.env.SMTP_PORT, // 587
  secure: false, // TLS (false for 587)
  auth: {
    user: process.env.SMTP_USER, // your email
    pass: process.env.SMTP_PASS, // app password or passkey
  },
});

// Function to send OTP email
exports.sendOTPEmail = async (to, otp) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM, // e.g., "PawRescue <pawrescuehelpline@gmail.com>"
      to,
      subject: "PawRescue - Email Verification OTP",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #FFFFFF; border-radius: 8px;">
          <h2 style="color: #FF9933;">🐾 PawRescue Verification</h2>
          <p>Hello,</p>
          <p>Your One-Time Password (OTP) is:</p>
          <h3 style="color: #75c978; font-size: 24px;">${otp}</h3>
          <p>This OTP will expire in <b>5 minutes</b>.</p>
          <p>If you did not request this, please ignore this email.</p>
          <br/>
          <p style="color:#999;">- PawRescue Team</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ OTP Email sent:", info.messageId);
  } catch (error) {
    console.error("❌ Error sending OTP email:", error);
    throw new Error("Could not send OTP email.");
  }
};
