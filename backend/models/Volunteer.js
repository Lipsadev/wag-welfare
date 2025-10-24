const mongoose = require("mongoose");

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

// Export the model
module.exports = mongoose.model("Volunteer", volunteerSchema);
