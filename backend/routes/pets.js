const express = require("express");
const router = express.Router();
const Pet = require("../models/Pet");

// @route   POST /api/pets
// @desc    Create new pet
router.post("/", async (req, res) => {
  try {
    const pet = await Pet.create(req.body);
    res.status(201).json(pet);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   GET /api/pets
// @desc    Get all pets (with optional filter ?type=cat)
router.get("/", async (req, res) => {
  try {
    const query = {};
    if (req.query.type && req.query.type !== "all") {
      query.type = req.query.type.toLowerCase();
    }

    const pets = await Pet.find(query).populate("postedBy", "name email");
    res.status(200).json(pets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   GET /api/pets/:id
// @desc    Get pet by ID
router.get("/:id", async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id).populate("postedBy", "name email");
    if (!pet) return res.status(404).json({ message: "Pet not found" });
    res.status(200).json(pet);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   PUT /api/pets/:id
// @desc    Update pet
router.put("/:id", async (req, res) => {
  try {
    const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!pet) return res.status(404).json({ message: "Pet not found" });
    res.status(200).json(pet);
  } catch (err) {
    console.error(err);
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
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
