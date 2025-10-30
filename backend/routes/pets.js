import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import Pet from "../models/Pet.js";
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

/* -------------------- POST: ADD A NEW PET -------------------- */
router.post("/", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    const { petName, age, breed, place, info } = req.body;

    if (!petName || !age || !breed || !place || !info || !req.file) {
      return res.status(400).json({
        success: false,
        message: "All fields including image are required.",
      });
    }

    // ✅ Upload image to Cloudinary
    const uploadedImage = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "pawrescue/pets" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(req.file.buffer);
    });

    // ✅ Save Pet details
    const pet = await Pet.create({
      petName,
      age,
      breed,
      place,
      info,
      image: uploadedImage.secure_url,
      userId: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Pet added successfully.",
      pet,
    });
  } catch (err) {
    console.error("❌ Error adding pet:", err);
    res.status(500).json({ success: false, message: "Failed to add pet." });
  }
});

/* -------------------- GET: ALL PETS -------------------- */
router.get("/", async (req, res) => {
  try {
    const pets = await Pet.find().sort({ createdAt: -1 });
    res.json({ success: true, pets });
  } catch (err) {
    console.error("Error fetching pets:", err);
    res.status(500).json({ success: false, message: "Failed to fetch pets." });
  }
});

/* -------------------- GET: PETS BY USER -------------------- */
router.get("/user/:id", async (req, res) => {
  try {
    const pets = await Pet.find({ userId: req.params.id }).sort({ createdAt: -1 });
    res.json({ success: true, pets });
  } catch (err) {
    console.error("Error fetching user's pets:", err);
    res.status(500).json({ success: false, message: "Failed to fetch user's pets." });
  }
});

/* -------------------- DELETE: ALL PETS (ADMIN USE) -------------------- */
router.delete("/", async (req, res) => {
  try {
    await Pet.deleteMany({});
    res.json({ success: true, message: "All pets deleted successfully." });
  } catch (err) {
    console.error("Error deleting pets:", err);
    res.status(500).json({ success: false, message: "Failed to delete pets." });
  }
});

export default router;
