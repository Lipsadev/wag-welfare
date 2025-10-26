// routes/pets.js
import express from "express";
import Pet from "../models/Pet.js";

const router = express.Router();

// @route   POST /api/pets
// @desc    Create new dog
router.post("/", async (req, res) => {
  try {
    const { name, description, type = "dog", image, postedBy } = req.body;

    if (!name || !image || !postedBy) {
      return res.status(400).json({ message: "Name, image, and postedBy are required" });
    }

    const pet = await Pet.create({ name, description, type, image, postedBy });
    res.status(201).json(pet);
  } catch (err) {
    console.error("Error creating pet:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   GET /api/pets
// @desc    Get all dogs
router.get("/", async (req, res) => {
  try {
    const pets = await Pet.find({ type: "dog" }).populate("postedBy", "name email");
    res.status(200).json(pets);
  } catch (err) {
    console.error("Error fetching pets:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   GET /api/pets/:id
// @desc    Get dog by ID
router.get("/:id", async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id).populate("postedBy", "name email");
    if (!pet) return res.status(404).json({ message: "Dog not found" });
    res.status(200).json(pet);
  } catch (err) {
    console.error("Error fetching pet:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   PUT /api/pets/:id
// @desc    Update dog
router.put("/:id", async (req, res) => {
  try {
    const { name, description, image } = req.body;
    const pet = await Pet.findByIdAndUpdate(
      req.params.id,
      { name, description, image },
      { new: true }
    );
    if (!pet) return res.status(404).json({ message: "Dog not found" });
    res.status(200).json(pet);
  } catch (err) {
    console.error("Error updating pet:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   DELETE /api/pets/:id
// @desc    Delete dog
router.delete("/:id", async (req, res) => {
  try {
    const pet = await Pet.findByIdAndDelete(req.params.id);
    if (!pet) return res.status(404).json({ message: "Dog not found" });
    res.status(200).json({ message: "Dog deleted successfully" });
  } catch (err) {
    console.error("Error deleting pet:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
