// src/lib/api.js
import axios from "axios";

const backendURL = "https://wag-welfare-a0at.onrender.com/api/auth";

// ---------------- Helper: Save token & user ----------------
const saveAuthData = (token, user) => {
  if (token) localStorage.setItem("authToken", token);
  if (user) localStorage.setItem("user", JSON.stringify(user));
};

// ---------------- Signup ----------------
export const signup = async ({ name, email, password }) => {
  try {
    const res = await axios.post(`${backendURL}/signup`, { name, email, password });
    const { token, user, message } = res.data;

    // Save token & user to localStorage
    saveAuthData(token, user);

    return { token, user, message };
  } catch (err) {
    throw err.response?.data || { message: "Signup failed" };
  }
};

// ---------------- Login with Password ----------------
export const loginWithPassword = async ({ email, password }) => {
  try {
    const res = await axios.post(`${backendURL}/login-password`, { email, password });
    const { token, user, message } = res.data;

    // Save token & user to localStorage
    saveAuthData(token, user);

    return { token, user, message };
  } catch (err) {
    throw err.response?.data || { message: "Login failed" };
  }
};

// ---------------- Forgot Password Flow ----------------
export const sendForgotPasswordOTP = async ({ email }) => {
  try {
    const res = await axios.post(`${backendURL}/forgot-password`, { email });
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to send forgot password OTP" };
  }
};

export const verifyForgotPasswordOTP = async ({ email, otp }) => {
  try {
    const res = await axios.post(`${backendURL}/verify-forgot-password-otp`, { email, otp });
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "OTP verification failed" };
  }
};

// ---------------- Reset Password ----------------
export const resetPassword = async ({ email, newPassword }) => {
  try {
    const res = await axios.post(`${backendURL}/reset-password`, { email, newPassword });
    const { token, message } = res.data;

    // Save token to localStorage for automatic login
    saveAuthData(token, null);

    return { token, message };
  } catch (err) {
    throw err.response?.data || { message: "Password reset failed" };
  }
};

// ---------------- Logout ----------------
export const logout = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");
};
