// ---------------- Server.js (ESM) ----------------
import dotenv from "dotenv";
dotenv.config(); // ✅ Load env first

console.log("🔍 SMTP_USER:", process.env.SMTP_USER);
console.log("🔍 SMTP_PASS:", process.env.SMTP_PASS ? "Loaded ✅" : "Missing ❌");

import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";

// ---------------- Models (ESM) ----------------
import User from "./models/User.js";
import Pet from "./models/Pet.js";
import Volunteer from "./models/Volunteer.js";

// ---------------- Routes (ESM) ----------------
import authRoutes from "./routes/authRoutes.js";
import petRoutes from "./routes/pets.js";
import rescueRoutes from "./routes/rescueRoutes.js";
import volunteerRoutes from "./routes/volunteerRoutes.js";
import chatRoutes from "./routes/chat.js";

// ---------------- Initialize App ----------------
const app = express();
console.log("📌 Starting PawRescue backend...");

// ---------------- Verify ENV ----------------
if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
  console.warn("⚠️ Warning: SMTP credentials not loaded. Check your .env file!");
} else {
  console.log(`📧 Email configured for: ${process.env.SMTP_USER}`);
}

// ---------------- Database Connection ----------------
connectDB()
  .then(() => console.log("✅ Database connected successfully"))
  .catch((err) => console.error("❌ Database connection failed:", err));

// ---------------- Path Helpers (for serving uploads) ----------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---------------- Middleware ----------------
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Debug logger
app.use((req, res, next) => {
  console.log(`📥 ${req.method} ${req.url}`);
  next();
});

// ---------------- Root Routes ----------------
app.get("/", (req, res) => {
  res.send("🐾 PawRescue backend is running!");
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "🐶 PawRescue backend is healthy!",
    timestamp: new Date().toISOString(),
  });
});

// ---------------- Static File Serving ----------------
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ---------------- API Routes ----------------
app.use("/api/auth", authRoutes);
app.use("/api/pets", petRoutes);
app.use("/api/rescues", rescueRoutes);
app.use("/api/volunteers", volunteerRoutes);
app.use("/api/chat", chatRoutes);

// ---------------- 404 Fallback ----------------
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ---------------- Global Error Handler ----------------
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err.stack);
  res.status(500).json({
    message: "Internal Server Error",
    error: err.message,
  });
});

// ---------------- Start Server ----------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  const API_BASE_URL = "https://wag-welfare-a0at.onrender.com";
});
