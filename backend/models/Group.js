import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true, maxlength: 80 },
  description: { type: String, maxlength: 500, default: "" },
  category: { type: String, default: "General" },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
}, { timestamps: true });

export default mongoose.model("Group", groupSchema);
