import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

function tokenFor(user) {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

export async function register(req, res) {
  const { username, email, password } = req.body;
  if (!username || !email || !password) return res.status(400).json({ message: "Username, email and password are required" });
  if (password.length < 8) return res.status(400).json({ message: "Password must be at least 8 characters" });
  const exists = await User.findOne({ $or: [{ email: email.toLowerCase() }, { username }] });
  if (exists) return res.status(409).json({ message: "Username or email already exists" });
  const passwordHash = await bcrypt.hash(password, 12);
  const user = await User.create({ username, email: email.toLowerCase(), passwordHash });
  res.status(201).json({ token: tokenFor(user), user: publicUser(user) });
}

export async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email?.toLowerCase() });
  if (!user || !(await bcrypt.compare(password || "", user.passwordHash))) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  res.json({ token: tokenFor(user), user: publicUser(user) });
}

export async function me(req, res) {
  res.json({ user: req.user });
}

function publicUser(user) {
  return {
    id: user._id,
    username: user.username,
    email: user.email,
    bio: user.bio,
    avatar: user.avatar,
    interests: user.interests,
    role: user.role
  };
}
