import mongoose from "mongoose";

const ctfSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, default: "" },
  platform: { type: String, default: "Online" },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  categories: [{ type: String }],
  registrationUrl: { type: String, required: true },
  source: { type: String, default: "Community" }
}, { timestamps: true });

export default mongoose.model("CTF", ctfSchema);
