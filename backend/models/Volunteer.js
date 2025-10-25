// models/Volunteer.js
import mongoose from "mongoose";

// Define the Volunteer schema
const volunteerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    place: { type: String, required: true },
    phone: { type: String, required: true },
    availability: { type: String }, // Optional field
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false } // removes __v field
);

// ✅ ESM export
const Volunteer = mongoose.model("Volunteer", volunteerSchema);
export default Volunteer;
