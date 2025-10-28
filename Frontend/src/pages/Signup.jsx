import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Signup = ({ onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();
  const backendURL = "https://wag-welfare-a0at.onrender.com/api/auth";

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${backendURL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Signup failed");

      setMessage("OTP sent! Check your email and enter the code below.");
      setOtpSent(true);
    } catch (err) {
      console.error("Signup error:", err);
      setMessage(err.message || "Network error");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${backendURL}/verify-signup-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "OTP verification failed");

      if (data.user && data.token) {
        login(data.user, data.token);
      }

      setMessage("✅ Signup verified! Redirecting...");
      setOtpSent(false);
      setName(""); setEmail(""); setPassword(""); setOtp("");

      if (onClose) onClose();
      navigate("/dashboard");
    } catch (err) {
      console.error("OTP verify error:", err);
      setMessage(err.message || "Network error");
    }
  };

  return (
    <div className="signup-container max-w-md mx-auto mt-10 p-6 rounded shadow" style={{ backgroundColor: "#FF9933", color: "white" }}>
      <h2 className="text-2xl mb-4">Sign Up</h2>
      {message && <p className="mb-2">{message}</p>}

      {!otpSent ? (
        <form onSubmit={handleSignup}>
          <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full mb-2 p-2 rounded" />
          <input type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full mb-2 p-2 rounded" />
          <input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full mb-2 p-2 rounded" />
          <button type="submit" className="w-full p-2 rounded bg-white text-orange-500 font-semibold">Send OTP</button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp}>
          <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required className="w-full mb-2 p-2 rounded" />
          <button type="submit" className="w-full p-2 rounded bg-white text-orange-500 font-semibold">Verify OTP & Login</button>
        </form>
      )}
    </div>
  );
};

export default Signup;
