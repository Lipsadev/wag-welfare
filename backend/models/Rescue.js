// models/Rescue.js
import mongoose from "mongoose";

// Rescue Schema
const rescueSchema = new mongoose.Schema(
  {
    reporterName: { type: String, required: true }, // Person reporting the rescue
    dogName: { type: String, required: true },      // Dog's name (must exist)
    place: { type: String, required: true },        // Location of rescue
    info: { type: String, required: true },         // Rescue details/info
    image: { type: String, required: true },        // Image path/URL (must exist)

    // Optional fields
    age: { type: String },
    size: { type: String },    // e.g., small, medium, large
    type: { type: String },    // e.g., stray, abandoned, injured
    breed: { type: String },

    // Adoption stats
    adoptionCount: { type: Number, default: 0 },
  },
  { timestamps: true } // Auto adds createdAt & updatedAt
);

// Avoid recompiling model in watch mode
const Rescue = mongoose.models.Rescue || mongoose.model("Rescue", rescueSchema);

export default Rescue;
