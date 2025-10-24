// backend/models/Pet.js
const mongoose = require("mongoose");

const petSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
    },
    breed: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
      enum: [
        "dog",
        "cat",
        "rabbit",
        "guinea pig",
        "hamster",
        "goldfish",
        "betta fish",
        "koi",
        "aquarium rescue",
      ],
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["available", "adopted"],
      default: "available",
    },
    location: {
      type: String,
      default: "Unknown",
    },
    size: {
      type: String,
      enum: ["Small", "Medium", "Large"],
      default: "Medium",
    },
    urgent: {
      type: Boolean,
      default: false,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pet", petSchema);
