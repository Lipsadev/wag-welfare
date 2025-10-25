// backend/models/User.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      minlength: 6, // Optional initially; user sets it after OTP verification
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    otp: {
      code: { type: String, default: null },      // hashed OTP
      expiresAt: { type: Date, default: null },   // expiry time
      verified: { type: Boolean, default: false } // OTP verified
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pet",
      },
    ],
    adoptedPets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pet",
      },
    ],
  },
  { timestamps: true }
);

// 🔒 Hash password before saving (only if modified)
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  if (!this.password) return next(); // skip if password not set yet
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// ✅ Compare password method (used in controller)
userSchema.methods.comparePassword = async function (enteredPassword) {
  if (!this.password) return false; // can't match if password not set
  return await bcrypt.compare(enteredPassword, this.password);
};

// ✅ Prevent OverwriteModelError in ESM
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
