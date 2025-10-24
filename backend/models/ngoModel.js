import mongoose from "mongoose";

const ngoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  focus: { type: String },
  website: { type: String },
});

const NGO = mongoose.model("NGO", ngoSchema);
export default NGO;
