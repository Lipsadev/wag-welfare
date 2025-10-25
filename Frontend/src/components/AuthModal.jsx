import React, { useState } from "react";
import {
  signup,
  loginWithPassword,
  sendForgotPasswordOTP,
  verifyForgotPasswordOTP,
  resetPassword,
} from "@/lib/api";
import { useAuth } from "../context/AuthContext"; // ✅ import AuthContext

const AuthModal = ({ type = "login", onClose }) => {
  const { login } = useAuth(); // ✅ get login function
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    otp: "",
    newPassword: "",
  });
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [forgotPasswordFlow, setForgotPasswordFlow] = useState(false);
  const [step, setStep] = useState(1);

  const isSignup = type === "signup";

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsSubmitting(true);

    try {
      if (forgotPasswordFlow) {
        if (step === 1) {
          if (!formData.email) throw new Error("Email is required");
          await sendForgotPasswordOTP({ email: formData.email });
          setMessage("OTP sent to your email");
          setStep(2);
        } else if (step === 2) {
          if (!formData.otp) throw new Error("OTP is required");
          await verifyForgotPasswordOTP({ email: formData.email, otp: formData.otp });
          setMessage("OTP verified! Enter new password.");
          setStep(3);
        } else if (step === 3) {
          if (!formData.newPassword) throw new Error("New password is required");

          const res = await resetPassword({
            email: formData.email,
            newPassword: formData.newPassword,
          });

          if (res.token && res.user) {
            login(res.user, res.token); // ✅ instant dropdown update
            setMessage("Password reset successful! Logged in.");
          } else {
            setMessage("Password reset successful!");
          }

          setTimeout(() => onClose(), 1200);
        }
      } else if (isSignup) {
        if (!formData.name || !formData.email || !formData.password)
          throw new Error("All fields are required");

        const res = await signup(formData);
        if (res.token && res.user) {
          login(res.user, res.token); // ✅ instant dropdown update
          setMessage("Signup successful! Logged in.");
        }

        setTimeout(() => onClose(), 1200);
      } else {
        if (!formData.email || !formData.password) throw new Error("Email & password required");

        const res = await loginWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (res.token && res.user) {
          login(res.user, res.token); // ✅ instant dropdown update
          setMessage("Login successful!");
        }

        setTimeout(() => onClose(), 1200);
      }
    } catch (err) {
      setMessage(err.response?.data?.message || err.message || "Action failed");
    }

    setIsSubmitting(false);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#FF9933",
          padding: "30px",
          borderRadius: "12px",
          minWidth: "320px",
          maxWidth: "400px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
          color: "black",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {forgotPasswordFlow && (
          <span
            onClick={() => {
              if (step === 1) setForgotPasswordFlow(false);
              else setStep(step - 1);
              setMessage("");
            }}
            style={{
              position: "absolute",
              top: "15px",
              left: "15px",
              cursor: "pointer",
              fontSize: "20px",
              color: "white",
              fontWeight: "bold",
            }}
          >
            ←
          </span>
        )}

        <h2 style={{ textAlign: "center", color: "white", marginBottom: "20px" }}>
          {forgotPasswordFlow
            ? step === 1
              ? "Forgot Password"
              : step === 2
              ? "Enter OTP"
              : "Reset Password"
            : isSignup
            ? "Sign Up"
            : "Login"}
        </h2>

        {isSignup && !forgotPasswordFlow && (
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            style={{ width: "100%", margin: "8px 0", padding: "10px", borderRadius: "6px", border: "1px solid #ccc", color: "black" }}
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={{ width: "100%", margin: "8px 0", padding: "10px", borderRadius: "6px", border: "1px solid #ccc", color: "black" }}
        />

        {!forgotPasswordFlow && (
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            style={{ width: "100%", margin: "8px 0", padding: "10px", borderRadius: "6px", border: "1px solid #ccc", color: "black" }}
          />
        )}

        {forgotPasswordFlow && step === 2 && (
          <input
            type="text"
            name="otp"
            placeholder="Enter OTP"
            value={formData.otp}
            onChange={handleChange}
            style={{ width: "100%", margin: "8px 0", padding: "10px", borderRadius: "6px", border: "1px solid #ccc", color: "black" }}
          />
        )}

        {forgotPasswordFlow && step === 3 && (
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={formData.newPassword}
            onChange={handleChange}
            style={{ width: "100%", margin: "8px 0", padding: "10px", borderRadius: "6px", border: "1px solid #ccc", color: "black" }}
          />
        )}

        {!isSignup && !forgotPasswordFlow && (
          <p
            onClick={() => {
              setForgotPasswordFlow(true);
              setStep(1);
              setMessage("");
            }}
            style={{ color: "white", cursor: "pointer", textAlign: "right", marginTop: "-6px", marginBottom: "8px", textDecoration: "underline" }}
          >
            Forgot Password?
          </p>
        )}

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "16px",
            background: "white",
            color: "#FF9933",
            border: "none",
            borderRadius: "6px",
            cursor: isSubmitting ? "not-allowed" : "pointer",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          {isSubmitting
            ? "Submitting..."
            : forgotPasswordFlow
            ? step === 1
              ? "Send OTP"
              : step === 2
              ? "Verify OTP"
              : "Reset Password"
            : isSignup
            ? "Sign Up"
            : "Login"}
        </button>

        {message && <p style={{ marginTop: "12px", textAlign: "center", color: "white" }}>{message}</p>}
      </div>
    </div>
  );
};

export default AuthModal;
