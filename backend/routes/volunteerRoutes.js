// routes/volunteerRoutes.js
import express from "express";
import Volunteer from "../models/Volunteer.js";

const router = express.Router();

// @route   GET /api/volunteers
// @desc    Get all volunteers
router.get("/", async (req, res) => {
  try {
    const volunteers = await Volunteer.find().sort({ createdAt: -1 });
    res.json(volunteers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// @route   GET /api/volunteers/:id
// @desc    Get volunteer by ID
router.get("/:id", async (req, res) => {
  try {
    const volunteer = await Volunteer.findById(req.params.id);
    if (!volunteer) return res.status(404).json({ message: "Volunteer not found" });
    res.json(volunteer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// @route   POST /api/volunteers
// @desc    Create a new volunteer
router.post("/", async (req, res) => {
  try {
    const { name, place, phone, availability } = req.body;
    if (!name || !place || !phone) {
      return res.status(400).json({ message: "Name, place, and phone are required" });
    }

    const newVolunteer = new Volunteer({ name, place, phone, availability });
    await newVolunteer.save();

    res.status(201).json({ success: true, volunteer: newVolunteer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// @route   PUT /api/volunteers/:id
// @desc    Update a volunteer
router.put("/:id", async (req, res) => {
  try {
    const updatedData = req.body;
    const updatedVolunteer = await Volunteer.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
    });
    if (!updatedVolunteer) return res.status(404).json({ message: "Volunteer not found" });
    res.json({ success: true, volunteer: updatedVolunteer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// @route   DELETE /api/volunteers/:id
// @desc    Delete a volunteer
router.delete("/:id", async (req, res) => {
  try {
    const deletedVolunteer = await Volunteer.findByIdAndDelete(req.params.id);
    if (!deletedVolunteer) return res.status(404).json({ message: "Volunteer not found" });
    res.json({ success: true, message: "Volunteer deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
