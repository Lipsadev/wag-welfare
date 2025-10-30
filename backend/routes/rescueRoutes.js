import express from "express";
import multer from "multer";
import nodemailer from "nodemailer";
import { v2 as cloudinary } from "cloudinary";
import Rescue from "../models/Rescue.js";
import Volunteer from "../models/Volunteer.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/* ------------------ CLOUDINARY CONFIGURATION ------------------ */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dlgow7bhp",
  api_key: process.env.CLOUDINARY_API_KEY || "364112411249494",
  api_secret: process.env.CLOUDINARY_API_SECRET || "8Vko-V7IxfWBYAzbCxTCtOF25jE",
});

/* -------------------------- MULTER SETUP -------------------------- */
const storage = multer.memoryStorage();
const upload = multer({ storage });

/* ---------------------- POST: REPORT A RESCUE ---------------------- */
router.post("/", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    const { reporterName, dogName, place, info } = req.body;

    if (!reporterName || !dogName || !place || !info || !req.file) {
      return res.status(400).json({
        success: false,
        message: "All fields including image are required.",
      });
    }

    // ✅ Upload image to Cloudinary
    const uploadedImage = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "pawrescue/rescues" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(req.file.buffer);
    });

    // ✅ Save rescue details
    const rescue = await Rescue.create({
      reporterName: reporterName || req.user.name,
      dogName,
      place,
      info,
      image: uploadedImage.secure_url,
      userId: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Rescue reported successfully.",
      rescue,
    });
  } catch (err) {
    console.error("❌ Error reporting rescue:", err);
    res.status(500).json({ success: false, message: "Failed to report rescue." });
  }
});

/* ------------------------- GET: ALL RESCUES ------------------------- */
router.get("/", async (req, res) => {
  try {
    const rescues = await Rescue.find().sort({ createdAt: -1 });
    res.json({ success: true, rescues });
  } catch (err) {
    console.error("Error fetching rescues:", err);
    res.status(500).json({ success: false, message: "Failed to fetch rescues." });
  }
});

/* ------------------ GET: RESCUES BY USER ----------------- */
router.get("/user/:id", async (req, res) => {
  try {
    const rescues = await Rescue.find({ userId: req.params.id }).sort({ createdAt: -1 });
    res.json({ success: true, rescues });
  } catch (err) {
    console.error("Error fetching user rescues:", err);
    res.status(500).json({ success: false, message: "Failed to fetch user's rescues." });
  }
});

/* -------------------- DELETE: ALL RESCUES (ADMIN USE) ------------------- */
router.delete("/", async (req, res) => {
  try {
    await Rescue.deleteMany({});
    res.json({ success: true, message: "All rescues deleted successfully." });
  } catch (err) {
    console.error("Error deleting rescues:", err);
    res.status(500).json({ success: false, message: "Failed to delete rescues." });
  }
});

/* -------------------- POST: ADD VOLUNTEER -------------------- */
router.post("/volunteers", async (req, res) => {
  try {
    const { name, place, phone, availability } = req.body;

    if (!name || !place || !phone || !availability) {
      return res.status(400).json({
        success: false,
        message: "All volunteer fields are required.",
      });
    }

    const volunteer = await Volunteer.create({ name, place, phone, availability });
    res.json({ success: true, message: "Volunteer added successfully.", volunteer });
  } catch (err) {
    console.error("Error adding volunteer:", err);
    res.status(500).json({ success: false, message: "Failed to add volunteer." });
  }
});

/* ---------------------- GET: ALL VOLUNTEERS ---------------------- */
router.get("/volunteers", async (req, res) => {
  try {
    const volunteers = await Volunteer.find().sort({ createdAt: -1 });
    res.json({ success: true, volunteers });
  } catch (err) {
    console.error("Error fetching volunteers:", err);
    res.status(500).json({ success: false, message: "Failed to fetch volunteers." });
  }
});

/* --------------------- POST: ADOPTION REQUEST ---------------------- */
router.post("/:id/adopt", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, reason } = req.body;

    if (!name || !email || !reason) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    const dog = await Rescue.findById(id);
    if (!dog) return res.status(404).json({ success: false, message: "Dog not found." });

    // ✅ Send email
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

    res.json({ success: true, message: "Adoption request sent successfully." });
  } catch (err) {
    console.error("Error sending adoption request:", err);
    res.status(500).json({ success: false, message: "Failed to send adoption request." });
  }
});

export default router;
