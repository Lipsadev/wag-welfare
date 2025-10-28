import React, { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const { login } = useAuth(); 
  const navigate = useNavigate();
  const backendURL = "https://wag-welfare-a0at.onrender.com/api/auth";

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${backendURL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      if (data.user && data.token) {
        login(data.user, data.token); // ✅ update context immediately
      }

      setMessage("🎉 Logged in successfully!");

      // ✅ Close modal and redirect
      if (onClose) onClose();
      navigate("/dashboard"); // optional
    } catch (err) {
      console.error("Login error:", err);
      setMessage(err.message || "Network error");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", textAlign: "center" }}>
      <h2>Login</h2>
      {message && <p>{message}</p>}

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: "8px", width: "80%", marginBottom: "10px" }}
        />
        <br />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: "8px", width: "80%", marginBottom: "10px" }}
        />
        <br />
        <button type="submit" style={{ padding: "8px 16px" }}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
