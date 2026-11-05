import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["news", "ctf"], required: true },
  item: { type: mongoose.Schema.Types.ObjectId, required: true }
}, { timestamps: true });

bookmarkSchema.index({ user: 1, type: 1, item: 1 }, { unique: true });

export default mongoose.model("Bookmark", bookmarkSchema);
