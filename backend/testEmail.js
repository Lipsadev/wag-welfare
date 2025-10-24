import { config } from "dotenv";
config(); // Load .env variables

import { sendOTPEmail } from "./utils/emailService.js";

sendOTPEmail("shristilipsa@gmail.com", 123456, "reset")
  .then(() => console.log("✅ Email test success"))
  .catch((err) => console.error("❌ Email test failed:", err));
