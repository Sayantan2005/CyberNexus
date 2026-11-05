import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true, minlength: 3, maxlength: 30 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  bio: { type: String, maxlength: 300, default: "" },
  avatar: { type: String, default: "" },
  interests: [{ type: String }],
  role: { type: String, enum: ["user", "moderator", "admin"], default: "user" }
}, { timestamps: true });

export default mongoose.model("User", userSchema);
