// utils.js
const { clsx } = require("clsx");
const { twMerge } = require("tailwind-merge");

/**
 * Combine class names and merge Tailwind classes
 * @param  {...any} inputs
 * @returns {string}
 */
function cn(...inputs) {
  return twMerge(clsx(...inputs));
}

/**
 * Generate a 6-digit OTP
 * @returns {number}
 */
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

module.exports = {
  cn,
  generateOTP,
};
