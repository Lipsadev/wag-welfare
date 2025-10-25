import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    // For now, just simulate success
    if (!name || !email || !password) {
      setMessage("All fields are required.");
      return;
    }

    setMessage("✅ Signup simulated. Redirecting...");
    setTimeout(() => navigate("/login"), 1000);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 rounded shadow" style={{ backgroundColor: "#FF9933", color: "white" }}>
      <h2 className="text-2xl mb-4">Sign Up</h2>
      {message && <p className="mb-2">{message}</p>}
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-2 p-2 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-2 p-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-2 p-2 rounded"
        />
        <button type="submit" className="w-full p-2 rounded bg-white text-orange-500 font-semibold">
          Sign Up
        </button>
      </form>
    </div>
  );
}
