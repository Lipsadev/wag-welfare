// routes/rescueRoutes.js
import express from "express";
import multer from "multer";
import path from "path";
import nodemailer from "nodemailer";
import Rescue from "../models/Rescue.js";
import Volunteer from "../models/Volunteer.js";
import authMiddleware from "../middleware/authMiddleware.js"; // ✅ new middleware

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

/**
 * POST /api/rescues
 * Report a new rescue (authenticated)
 */
router.post("/", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    const { reporterName, dogName, place, info, age, size, type, breed } = req.body;
    const image = req.file ? req.file.filename : null;

    const newRescue = new Rescue({
      reporterName: reporterName || req.user.name,
      dogName,
      place,
      info,
      image,
      age,
      size,
      type,
      breed,
      userId: req.user._id, // ✅ link to logged-in user
    });

    await newRescue.save();
    res.json({ success: true, message: "Rescue reported successfully", rescue: newRescue });
  } catch (err) {
    console.error("Error reporting rescue:", err);
    res.status(500).json({ success: false, message: "Failed to report rescue" });
  }
});

/**
 * GET /api/rescues
 * Fetch all rescues (public)
 */
router.get("/", async (req, res) => {
  try {
    const rescues = await Rescue.find().sort({ createdAt: -1 });
    res.json({ success: true, rescues });
  } catch (err) {
    console.error("Error fetching rescues:", err);
    res.status(500).json({ success: false, message: "Failed to fetch rescues" });
  }
});

/**
 * GET /api/rescues/user/:id
 * Fetch rescues submitted by a specific user (authenticated optional)
 */
router.get("/user/:id", async (req, res) => {
  try {
    const rescues = await Rescue.find({ userId: req.params.id }).sort({ createdAt: -1 });
    res.json(rescues);
  } catch (err) {
    console.error("Error fetching user rescues:", err);
    res.status(500).json({ success: false, message: "Failed to fetch user's rescues" });
  }
});

/**
 * DELETE /api/rescues
 * Delete all rescues (admin/debug)
 */
router.delete("/", async (req, res) => {
  try {
    await Rescue.deleteMany({});
    res.json({ success: true, message: "All rescues deleted successfully" });
  } catch (err) {
    console.error("Error deleting rescues:", err);
    res.status(500).json({ success: false, message: "Failed to delete rescues" });
  }
});

/**
 * POST /api/rescues/volunteers
 * Add a volunteer
 */
router.post("/volunteers", async (req, res) => {
  try {
    const { name, place, phone, availability } = req.body;
    const newVolunteer = new Volunteer({ name, place, phone, availability });
    await newVolunteer.save();
    res.json({ success: true, message: "Volunteer added successfully", volunteer: newVolunteer });
  } catch (err) {
    console.error("Error adding volunteer:", err);
    res.status(500).json({ success: false, message: "Failed to add volunteer" });
  }
});

/**
 * GET /api/rescues/volunteers
 * Get all volunteers
 */
router.get("/volunteers", async (req, res) => {
  try {
    const volunteers = await Volunteer.find().sort({ createdAt: -1 });
    res.json({ success: true, volunteers });
  } catch (err) {
    console.error("Error fetching volunteers:", err);
    res.status(500).json({ success: false, message: "Failed to fetch volunteers" });
  }
});

/**
 * POST /api/rescues/:id/adopt
 * Send adoption request via email
 */
router.post("/:id/adopt", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, reason } = req.body;

    if (!name || !email || !reason) {
      return res.status(400).json({ success: false, message: "All fields required" });
    }

    const dog = await Rescue.findById(id);
    if (!dog) return res.status(404).json({ success: false, message: "Dog not found" });

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: { rejectUnauthorized: false },
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM || `"PawRescue Adoption" <${process.env.SMTP_USER}>`,
      to: "pawrescuehelpline@gmail.com",
      subject: `New Adoption Request for ${dog.dogName}`,
      text: `Name: ${name}\nEmail: ${email}\nDog: ${dog.dogName}\nReason: ${reason}`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: "Adoption request sent successfully" });
  } catch (err) {
    console.error("Error sending adoption request:", err);
    res.status(500).json({ success: false, message: "Failed to send adoption request" });
  }
});

export default router;
