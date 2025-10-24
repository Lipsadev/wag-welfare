// backend/utils/otp.js
const bcrypt = require("bcryptjs");

/**
 * Generate a random numeric OTP
 * @param {number} length - Number of digits
 * @returns {string} OTP as string
 */
function generateOTP(length = 6) {
  const digits = "0123456789";
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return otp;
}

/**
 * Hash OTP before saving in DB
 * @param {string} otp
 * @returns {Promise<string>} hashed OTP
 */
async function hashOTP(otp) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(otp, salt);
}

/**
 * Compare entered OTP with stored hashed OTP
 * @param {string} enteredOTP
 * @param {string} hashedOTP
 * @returns {Promise<boolean>}
 */
async function verifyOTP(enteredOTP, hashedOTP) {
  return await bcrypt.compare(enteredOTP, hashedOTP);
}

/**
 * Check if OTP is expired
 * @param {Date} otpExpiry
 * @returns {boolean}
 */
function isOTPExpired(otpExpiry) {
  return new Date() > otpExpiry;
}

module.exports = {
  generateOTP,
  hashOTP,
  verifyOTP,
  isOTPExpired,
};
