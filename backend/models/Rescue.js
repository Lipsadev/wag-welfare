// models/Rescue.js
import mongoose from "mongoose";

// Minimal Rescue Schema
const rescueSchema = new mongoose.Schema(
  {
    reporterName: { type: String, required: true }, // User reporting the rescue
    dogName: { type: String, required: true },      // Dog's name
    place: { type: String, required: true },        // Location of rescue
    info: { type: String, required: true },         // Additional information
    image: { type: String, required: true },        // Image filename/path
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Link to reporting user
  },
  { timestamps: true } // createdAt & updatedAt
);

// Avoid recompiling model in watch mode
const Rescue = mongoose.models.Rescue || mongoose.model("Rescue", rescueSchema);

export default Rescue;
