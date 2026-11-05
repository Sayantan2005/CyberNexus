import "express-async-errors";
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.js";
import newsRoutes from "./routes/news.js";
import ctfRoutes from "./routes/ctfs.js";
import groupRoutes from "./routes/groups.js";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
import bookmarkRoutes from "./routes/bookmarks.js";

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL?.split(",") || "*", credentials: false }));
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/ctfs", ctfRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);
app.use("/api/bookmarks", bookmarkRoutes);

app.get("/api/health", (_, res) => res.json({ status: "ok", service: "CyberNexus API" }));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || "Server error" });
});

const port = process.env.PORT || 5000;
connectDB().then(() => app.listen(port, () => console.log(`API running on ${port}`)))
  .catch(err => { console.error(err); process.exit(1); });
