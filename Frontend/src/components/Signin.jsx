import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setMessage("Both fields are required.");
      return;
    }
    setMessage("✅ Login simulated!");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 rounded shadow" style={{ backgroundColor: "#75c978", color: "white" }}>
      <h2 className="text-2xl mb-4">Login</h2>
      {message && <p className="mb-2">{message}</p>}
      <form onSubmit={handleLogin}>
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
        <button type="submit" className="w-full p-2 rounded bg-white text-green-500 font-semibold">
          Login
        </button>
      </form>
    </div>
  );
}
