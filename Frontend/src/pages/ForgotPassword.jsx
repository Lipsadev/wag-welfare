import React, { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1); // Step 1: request OTP, Step 2: reset password
  const [message, setMessage] = useState("");

  const backendURL = "https://wag-welfare-a0at.onrender.com/api/auth";

  // Step 1: Request OTP
  const requestOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${backendURL}/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to send OTP");

      setMessage("OTP sent! Check your email.");
      setStep(2);
    } catch (err) {
      console.error("❌ Forgot password error:", err);
      setMessage(err.message || "Network error");
    }
  };

  // Step 2: Reset Password
  const resetPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${backendURL}/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Password reset failed");

      setMessage("✅ Password reset successful! You can now login.");
      setStep(1);
      setEmail("");
      setOtp("");
      setNewPassword("");
    } catch (err) {
      console.error("❌ Reset password error:", err);
      setMessage(err.message || "Network error");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Forgot Password</h2>
      {message && <p>{message}</p>}

      {step === 1 ? (
        <form onSubmit={requestOtp}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          /><br /><br />
          <button type="submit">Send OTP</button>
        </form>
      ) : (
        <form onSubmit={resetPassword}>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          /><br /><br />
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          /><br /><br />
          <button type="submit">Reset Password</button>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
