// routes/pets.js
import express from "express";
import Pet from "../models/Pet.js";

const router = express.Router();

// @route   POST /api/pets
// @desc    Add a new pet (dog)
router.post("/", async (req, res) => {
  try {
    const { name, info, image, postedBy } = req.body;

    if (!name || !image || !postedBy) {
      return res.status(400).json({ message: "Name, image, and postedBy are required" });
    }

    const pet = await Pet.create({ name, info, image, postedBy });
    res.status(201).json(pet);
  } catch (err) {
    console.error("Error creating pet:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   GET /api/pets
// @desc    Get all pets
router.get("/", async (req, res) => {
  try {
    const pets = await Pet.find().populate("postedBy", "name email").sort({ createdAt: -1 });
    res.status(200).json(pets);
  } catch (err) {
    console.error("Error fetching pets:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   GET /api/pets/:id
// @desc    Get a specific pet by ID
router.get("/:id", async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id).populate("postedBy", "name email");
    if (!pet) return res.status(404).json({ message: "Pet not found" });
    res.status(200).json(pet);
  } catch (err) {
    console.error("Error fetching pet:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   PUT /api/pets/:id
// @desc    Update pet details
router.put("/:id", async (req, res) => {
  try {
    const { name, info, image } = req.body;
    const pet = await Pet.findByIdAndUpdate(
      req.params.id,
      { name, info, image },
      { new: true }
    );
    if (!pet) return res.status(404).json({ message: "Pet not found" });
    res.status(200).json(pet);
  } catch (err) {
    console.error("Error updating pet:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   DELETE /api/pets/:id
// @desc    Delete pet
router.delete("/:id", async (req, res) => {
  try {
    const pet = await Pet.findByIdAndDelete(req.params.id);
    if (!pet) return res.status(404).json({ message: "Pet not found" });
    res.status(200).json({ message: "Pet deleted successfully" });
  } catch (err) {
    console.error("Error deleting pet:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
