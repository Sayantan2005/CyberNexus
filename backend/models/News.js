import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, default: "" },
  url: { type: String, required: true, unique: true },
  image: { type: String, default: "" },
  source: { type: String, default: "Unknown" },
  category: { type: String, default: "Cybersecurity" },
  publishedAt: { type: Date, default: Date.now },
  tags: [{ type: String }]
}, { timestamps: true });

export default mongoose.model("News", newsSchema);
